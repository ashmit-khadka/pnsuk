const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const port = 3001;
const multer = require("multer");
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const AWS = require('aws-sdk');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { getS3Url: getS3UrlUtil } = require('./utils/s3');


const defaultEvents = require('./backup/defaults/events.json');
//const defaultArticles = require('./backup/defaults/articles.json');

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;
const environment = process.env.NODE_ENV || 'development';

const getS3Url = (type, s3Key) => {
  return getS3UrlUtil(type, s3Key, bucketName, process.env.AWS_REGION);
}

// Helper function to upload file to S3
const uploadToS3 = async (file, objectType) => {
  const envFolder = environment === 'production' ? 'prod' : 'dev';
  const fileName = `prod/assets/${objectType}/${uuidv4()}-${file.originalname}`;
  
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer, // Use buffer for memory storage
    ContentType: file.mimetype
  };

  console.log('Uploading to S3:', fileName);
  const result = await s3.upload(uploadParams).promise();
  
  return {
    s3Url: result.Location,
    s3Key: result.Key,
    fileName: fileName
  };
};

// Helper function to delete file from S3
const deleteFromS3 = async (s3Key) => {
  if (!s3Key) return;
  
  const deleteParams = {
    Bucket: bucketName,
    Key: s3Key
  };
  
  try {
    await s3.deleteObject(deleteParams).promise();
    console.log('Deleted from S3:', s3Key);
  } catch (error) {
    console.error('Error deleting from S3:', error);
  }
};

console.log('AWS Configuration:');
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');
console.log('Region:', process.env.AWS_REGION);
console.log('Bucket Name:', bucketName);

// Validate required environment variables
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !bucketName) {
  console.error('Missing required AWS environment variables. Please check your .env file.');
  console.error('Required variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME');
}

const minutesPath = 'assets/media/docs/minutes/';

// Set up storage with Multer - using memory storage for S3 uploads
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB limit
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbPath = path.join(__dirname, 'db.sqlite3');
const dbPathBackup = path.join(__dirname, 'backup/db_old.sqlite3');


// Connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
});

// Connect to old the database (for migration only)
const db_old = new sqlite3.Database(dbPathBackup, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
});

const dbAllAsync = (sql, db, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// Utility function to wrap db.run in a promise
const dbRunAsync = (sql, db, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};


const getArticles = async () => {
  // Get all articles from the database
  const articles = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM articles ORDER BY DATE DESC;', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });

  // Get all images from the database
  const images = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM article_images;', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });

  // Combine articles and images with proper S3 URLs
  const articlesWithImages = articles.map(article => {
    const articleImages = images.filter(image => image.article === article.id) || [];
    article.images = articleImages.map(img => ({
      ...img,
      image: getS3Url('article', img.image) // Add full S3 URL
    }));
    return article;
  });

  return articlesWithImages;
};

const getArticleById = async (id) => {
  const articles = await getArticles();
  const article = articles.find(article => article.id === id);
  return article;
};



// app.post('/article', upload.array("images", 10), (req, res) => {
//   const article = req.body;
//   const articleId = uuidv4();
//   const imageId = uuidv4();

//   // db.serialize(() => {
//   //   db.run('INSERT INTO articles (id, title, date, text, is_event, is_aid, is_guest, is_project, is_home, is_sport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [articleId, article.title, article.date, article.text, article.is_event, article.is_aid, article.is_guest, article.is_project, article.is_home, article.is_sport]);
//   //   db.run('INSERT INTO article_images (id, article, image) VALUES (?, ?, ?);', [imageId, articleId, article.image]);
//   // });

//   res.status(201).send('Article created');
// });

// Endpoint to handle multiple files and text data upload

const convertToBoolean = (value) => {
  return value === 'true' ? 1 : 0;
}


const creatArticle = async (article) => {
  const articleId = uuidv4();

  db.serialize(() => {
    db.run('INSERT INTO articles (id, title, date, text, is_event, is_aid, is_guest, is_project, is_home, is_sport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [articleId, article.title, article.date, article.text, article.is_event, article.is_aid, article.is_guest, article.is_project, article.is_home, article.is_sport]);

    // Store S3 paths in database
    article.images.new.forEach((s3Result) => {
      const imageId = uuidv4();
      db.run('INSERT INTO article_images (id, article, image) VALUES (?, ?, ?);', [imageId, articleId, s3Result.fileName]);
    });
  });

  return articleId;
};

const updateArticle = async (article) => {
  db.serialize(() => {
    db.run('UPDATE articles SET title = ?, date = ?, text = ?, is_event = ?, is_aid = ?, is_guest = ?, is_project = ?, is_home = ?, is_sport = ? WHERE id = ?;', [article.title, article.date, article.text, article.is_event, article.is_aid, article.is_guest, article.is_project, article.is_home, article.is_sport, article.id]);
  });

  // find current images for article and delete and add where necessary
  db.serialize(() => {
    db.run('DELETE FROM article_images WHERE article = ?;', [article.id]);

    // Store new S3 image paths
    article.images.new.forEach((s3Result) => {
      const imageId = uuidv4();
      db.run('INSERT INTO article_images (id, article, image) VALUES (?, ?, ?);', [imageId, article.id, s3Result.fileName]);
    });
    
    // Keep existing images (these are already S3 paths)
    article.images.old.forEach((imagePath) => {
      const imageId = uuidv4();
      db.run('INSERT INTO article_images (id, article, image) VALUES (?, ?, ?);', [imageId, article.id, imagePath]);
    });
  });

  return article.id;  
};

const deleteArticleImages = (imageId) => {
  db.serialize(() => {
    db.run('DELETE FROM article_images WHERE image = ?;', [imageId]);
  });
}

app.get('/articles', async (req, res) => {
  try {
    const articles = await getArticles();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get('/article/:id', async (req, res) => {
  // Get article from the database with images
  const article = await getArticleById(req.params.id);
  res.json(article);
});

app.post("/article", upload.array("images", 10), async (req, res) => {
  try {

    // Upload all images to S3
    const uploadPromises = req.files.map(file => uploadToS3(file, 'media/images/articles'));
    const s3Results = await Promise.all(uploadPromises);

    const newArticle = {
      id: req.body.id,
      title: req.body.title,
      text: req.body.text,
      date: req.body.date,
      is_event: convertToBoolean(req.body.is_event),
      is_aid: convertToBoolean(req.body.is_aid),
      is_guest: convertToBoolean(req.body.is_guest),
      is_project: convertToBoolean(req.body.is_project),
      is_home: convertToBoolean(req.body.is_home),
      is_sport: convertToBoolean(req.body.is_sport),
      images: { 
        new: s3Results, 
        old: req.body.existing_images ? req.body.existing_images : []
      },
    };

    let articleId = newArticle?.id;
    if (articleId) {
      articleId = await updateArticle(newArticle);
    } else {
      articleId = await creatArticle(newArticle);
    }

    const article = await getArticleById(articleId);
    res.json(article);
    
  } catch (error) {
    console.error('Article upload error:', error);
    res.status(500).json({ 
      error: 'Article upload failed', 
      details: error.message 
    });
  }
});


app.delete('/article/image/:id', (req, res) => {
  deleteArticleImages(req.params.id);

  res.status(200).send('Article image deleted');
});


app.put('/article/:id', (req, res) => {
  const article = req.body;

  db.serialize(() => {
    db.run('UPDATE articles SET title = ?, date = ?, text = ?, is_event = ?, is_aid = ?, is_guest = ?, is_project = ?, is_home = ?, is_sport = ? WHERE id = ?;', [article.title, article.date, article.text, article.is_event, article.is_aid, article.is_guest, article.is_project, article.is_home, article.is_sport, req.params.id]);
  });

  res.status(200).send('Article updated');
});

app.delete('/article/:id', async (req, res) => {
  try {
    // Get article images to delete from S3
    const images = await dbAllAsync('SELECT * FROM article_images WHERE article = ?;', db, [req.params.id]);
    
    // Delete images from S3
    for (const image of images) {
      await deleteFromS3(image.image);
    }
    
    // Delete from database
    db.serialize(() => {
      db.run('DELETE FROM articles WHERE id = ?;', [req.params.id]);
      db.run('DELETE FROM article_images WHERE article = ?;', [req.params.id]);
    });

    res.status(200).send('Article deleted');
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article', details: error.message });
  }
});

app.get('/media', async (req, res) => {
  try {
    const media = await dbAllAsync('SELECT * FROM media;', db);
    const mediaWithUrls = media.map(item => ({
      ...item,
      s3_key: getS3Url('media', item.s3_key)
    }));
    res.json(mediaWithUrls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get('/media/:id', async (req, res) => {
  try {
    const item = (await dbAllAsync('SELECT * FROM media WHERE id = ?;', db, [req.params.id]))[0];
    if (item) {
      item.s3_key = getS3Url('media', item.s3_key);
      res.json(item);
    } else {
      res.status(404).send('Media not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.post('/media', upload.single("image"), async (req, res) => {
  try {
    let s3Key = req.body.existing_image;
    let type = req.body.type; // Keep existing type if not uploading a new file

    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/images/media');
      s3Key = s3Result.fileName;
      
      // Infer type from mimetype
      if (req.file.mimetype.startsWith('image/')) {
        type = 'image';
      } else if (req.file.mimetype.startsWith('video/')) {
        type = 'video';
      }
    }

    const { id, name, link, is_home, is_gallery } = req.body;
    const isHomeBool = is_home === 'true' ? 1 : 0;
    const isGalleryBool = is_gallery === 'true' ? 1 : 0;

    if (id) {
      // Update
      await dbRunAsync('UPDATE media SET name = ?, link = ?, s3_key = ?, type = ?, is_home = ?, is_gallery = ? WHERE id = ?;', db, [name, link, s3Key, type, isHomeBool, isGalleryBool, id]);
    } else {
      // Create
      const createdAt = new Date().toISOString();
      await dbRunAsync('INSERT INTO media (name, link, s3_key, type, is_home, is_gallery, created_at) VALUES (?, ?, ?, ?, ?, ?, ?);', db, [name, link, s3Key, type, isHomeBool, isGalleryBool, createdAt]);
    }
    res.status(200).send('Media saved');
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Media upload failed', details: error.message });
  }
});

app.delete('/media/:id', async (req, res) => {
  try {
    const item = (await dbAllAsync('SELECT * FROM media WHERE id = ?;', db, [req.params.id]))[0];
    if (item && item.s3_key) {
      await deleteFromS3(item.s3_key);
    }
    await dbRunAsync('DELETE FROM media WHERE id = ?;', db, [req.params.id]);
    res.status(200).send('Media deleted');
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media', details: error.message });
  }
});


app.put('/articles/clear', (req, res) => {
  db.serialize(() => {
    db.run('DELETE FROM articles;');
    db.run('DELETE FROM article_images;');
  });

  res.status(200).send('Articles cleared');
});

/**
 * Member object: 
 * {
 * id: string,
 * name: string,
 * image: string,
 * position: string,
 * order: number,
 * }
 */

const db_exec = async ({
  reqestSQL,
  returnSQL,
}) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(reqestSQL, function (err) {
        if (err) {
          return reject(err);
        }
        db.get(returnSQL, (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        });
      });
    });
  });

}

const creatMember = (member) => {
  const memberId = uuidv4();

  db.serialize(() => {
    db.run('INSERT INTO members (id, name, image, position, role, "order") VALUES (?, ?, ?, ?, ?, ?);', [memberId, member.name, member.image, member.position, member.role, member.order]);
  });

  return memberId;
};

const updateMember = async (member) => {
  await db_exec({
    reqestSQL: `UPDATE members SET name = '${member.name}', image = '${member.image}', position = '${member.position}', role = '${member.role}', "order" = ${member.order} WHERE id = '${member.id}';`,
    returnSQL: `SELECT * FROM members WHERE id = '${member.id}';`,
  });
  return member.id;
};


const deleteMember = async (id) => {
  try {
    // Get member to find image S3 key for deletion
    const member = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM members WHERE id = ?;', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
    
    // Delete image from S3 if it exists
    if (member && member.image) {
      await deleteFromS3(member.image);
    }
    
    // Delete from database
    db.serialize(() => {
      db.run('DELETE FROM members WHERE id = ?;', [id]);
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
}

const getMember = async (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM members WHERE id = ?;', [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (row) {
        row.image = getS3Url('member', row.image);
      }
      resolve(row);
    });
  });
};

const getMembers = async () => {
  const members = await dbAllAsync('SELECT * FROM members;', db);
  // Add S3 URLs to member images
  return members.map(member => ({
    ...member,
    image: getS3Url("member", member.image)
  }));
}

app.get('/members', (req, res) => {
  getMembers()
    .then(members => {
      res.json(members);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
});

app.post("/member", upload.single("image"), async (req, res) => {
  try {
    let imageS3Path = req?.body?.existing_image; // Keep existing image if no new one uploaded
    
    // Upload new image to S3 if provided
    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/images/committee');
      imageS3Path = s3Result.fileName; // Store the S3 key/path in database
    }

    const member = {
      id: req.body?.id,
      name: req.body?.name,
      image: imageS3Path, // This will be the S3 key stored in database
      position: req.body?.position,
      role: req.body?.role,
      order: req.body?.order,
    };

    if (member?.id) {
      await updateMember(member);
    } else {
      const newMemberId = await creatMember(member);
      member.id = newMemberId;
    }

    const memberResponse = await getMember(member?.id);
    res.json(memberResponse);
    
  } catch (error) {
    console.error('Member upload error:', error);
    res.status(500).json({ 
      error: 'Member upload failed', 
      details: error.message 
    });
  }
});

app.put("/member/:id", upload.single("image"), async (req, res) => {
  try {
    let imageS3Path = req?.body?.existing_image; // Keep existing image if no new one uploaded
    
    // Upload new image to S3 if provided
    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/images/committee');
      imageS3Path = s3Result.fileName; // Store the S3 key/path in database
    }

    const member = {
      id: req.body?.id,
      name: req.body?.name,
      image: imageS3Path, // This will be the S3 key stored in database
      position: req.body?.position,
      role: req.body?.role,
      order: req.body?.order,
    };

    const updatedMember = await updateMember(member);
    const memberResponse = await getMember(member?.id);
    res.json(memberResponse);
    
  } catch (error) {
    console.error('Member update error:', error);
    res.status(500).json({ 
      error: 'Member update failed', 
      details: error.message 
    });
  }
});


app.delete('/member/:id', async (req, res) => {
  await deleteMember(req.params.id);
  res.status(200).send('Member deleted');
});

app.get('/member/:id', async (req, res) => {
  const member = await getMember(req.params.id);
  res.json(member);
});

/**
 * Minutes object: 
 * {
 * id: string,
 * file: string,
 * date: string,
 * description: string,
 * order: number,
 * }
 */

const createMinutes = (minutes) => {
  const minutesId = uuidv4();

  db.serialize(() => {
    db.run('INSERT INTO minutes (id, title, description, date, file) VALUES (?, ?, ?, ?, ?);', [minutesId, minutes.title, minutes.description, minutes.date, minutes.file]);
  });

  return minutesId;
};

const updateMinutes = (minutes) => {
  db.serialize(() => {
    db.run('UPDATE minutes SET title = ?, description = ?, date = ?, file = ? WHERE id = ?;', [minutes.title, minutes.description, minutes.date, minutes.file, minutes.id]);
  });

  return minutes.id;
};

const deleteMinutes = async (id) => {
  // Get minute to find file path
  const minute = await getMinute(id);
  if (minute && minute.file) {
    await deleteFromS3(minute.file);
  }
  
  db.serialize(() => {
    db.run('DELETE FROM minutes WHERE id = ?;', [id]);
  });
}

const getMinute = async (id) => {
  const minute = (await dbAllAsync('SELECT * FROM minutes WHERE id = ?;', db, [id]))[0];
  // The file field now contains the S3 path, so we can construct the full S3 URL
  if (minute && minute.file) {
    minute.filePath = getS3Url('minute', minute.file);
  }
  return minute;
}

const getMinutes = async (id) => {
  const minutes = await dbAllAsync('SELECT * FROM minutes;', db);
  return minutes;
}

app.get('/minute/:id', (req, res) => {
  getMinute(req.params.id)
    .then(minute => {
      minute.fileUrl = getS3Url('minute', minute.file);
      res.json(minute);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
});

app.get('/minutes', (req, res) => {
  getMinutes()
    .then(minutes => {
      minutes.forEach(minute => {
        minute.fileUrl = getS3Url('minute', minute.file);
      });
      res.json(minutes);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
});

app.post('/minutes', upload.single("document"), async (req, res) => {
  try {
    const minutes = req.body;
    let fileS3Path = req?.body?.existing_document;

    // Upload new document to S3 if provided
    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/docs/minutes');
      fileS3Path = s3Result.fileName;
    }

    const minute = {
      id: minutes.id,
      title: minutes.title,
      description: minutes.description,
      date: minutes.date,
      file: fileS3Path,
    };

    if (minute?.id) {
      await updateMinutes(minute);
    } else {
      const newMinuteId = await createMinutes(minute);
      minute.id = newMinuteId;
    }

    const minuteResponse = await getMinute(minute.id);
    res.json(minuteResponse);
    
  } catch (error) {
    console.error('Minutes upload error:', error);
    res.status(500).json({ 
      error: 'Minutes upload failed', 
      details: error.message 
    });
  }
});

app.put('/minutes/:id', upload.single("document"), async (req, res) => {
  const minute = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    file: req?.file?.filename || req.body.existing_document,
  }

  await updateMinutes(minute);

  const updatedMinute = await getMinute(minute.id)

  res.json(updatedMinute)
});

app.delete('/minutes/:id', async (req, res) => {
  await deleteMinutes(req.params.id);
  res.status(200).send('Minutes deleted');
});

app.get('/reset', (req, res) => {
  db.serialize(() => {
    // drop tables if they exist
    db.run('DROP TABLE IF EXISTS articles;');
    db.run('DROP TABLE IF EXISTS article_images;');
    db.run('DROP TABLE IF EXISTS members;');
    db.run('DROP TABLE IF EXISTS minutes;');
    db.run('DROP TABLE IF EXISTS events;');

    // create tables
    db.run('CREATE TABLE articles (id TEXT PRIMARY KEY, title TEXT, date TEXT, text TEXT, is_event INTEGER, is_aid INTEGER, is_guest INTEGER, is_project INTEGER, is_home INTEGER, is_sport INTEGER);');
    db.run('CREATE TABLE article_images (id TEXT PRIMARY KEY, article TEXT, image TEXT);');
    db.run('CREATE TABLE members (id TEXT PRIMARY KEY, name TEXT, image TEXT, position TEXT, role TEXT, "order" INTEGER);');
    db.run('CREATE TABLE minutes (id TEXT PRIMARY KEY, title TEXT, file TEXT, date TEXT, description TEXT, "order" INTEGER);');
    db.run('CREATE TABLE events (id TEXT PRIMARY KEY, title TEXT, description TEXT, timestamp TEXT, location TEXT, contact TEXT, recurring TEXT, image TEXT);');

    // insert default data
    db.run('INSERT INTO members (id, name, image, position, "order") VALUES (?, ?, ?, ?, ?);', [uuidv4(), 'John Doe', 'john-doe.jpg', 'CEO', 1]);
    db.run('INSERT INTO members (id, name, image, position, "order") VALUES (?, ?, ?, ?, ?);', [uuidv4(), 'Jane Doe', 'jane-doe.jpg', 'CTO', 2]);
    db.run('INSERT INTO articles (id, title, date, text, is_event, is_aid, is_guest, is_project, is_home, is_sport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [uuidv4(), 'Welcome to our website', '2021-01-01', 'Welcome to our website', 'true', 'false', 'false', 'false', 'false', 'false']);
    db.run('INSERT INTO articles (id, title, date, text, is_event, is_aid, is_guest, is_project, is_home, is_sport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [uuidv4(), 'Our mission', '2021-01-02', 'Our mission', 'false', 'true', 'false', 'false', 'false', 'false']);
    db.run('INSERT INTO minutes (id, file, date, description, "order") VALUES (?, ?, ?, ?, ?);', [uuidv4(), 'minutes-2021-01-01.pdf', '2021-01-01', 'Minutes of the meeting on 2021-01-01', 1]);
    db.run('INSERT INTO minutes (id, file, date, description, "order") VALUES (?, ?, ?, ?, ?);', [uuidv4(), 'minutes-2021-01-02.pdf', '2021-01-02', 'Minutes of the meeting on 2021-01-02', 2]);
  }

  );

  res.status(200).send('Database reset');
})



const getEvents = async () => {
  const events = await dbAllAsync('SELECT * FROM events;', db);
  // Add S3 URLs to event images
  return events.map(event => ({
    ...event,
    image: getS3Url("event", event.image)
  }));
}

const getEvent = async (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM events WHERE id = ?;', [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (row) {
        row.image = getS3Url('event', row.image);
      }
      resolve(row);
    });
  });
}

const createEvent = async (event) => {
  const eventId = uuidv4();

  db.serialize(() => {
    db.run('INSERT INTO events (id, title, description, timestamp, location, contact, recurring, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [eventId, event.title, event.description, event.timestamp, event.location, event.contact, event.recurring, event.image]);
  });

  return eventId;
};

const deleteEvent = async (id) => {
  try {
    // Get event to find image S3 key for deletion
    const event = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM events WHERE id = ?;', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
    
    // Delete image from S3 if it exists
    if (event && event.image) {
      await deleteFromS3(event.image);
    }
    
    // Delete from database
    db.serialize(() => {
      db.run('DELETE from events where events.id=?', [id]);
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

const updateEvent = async (event) => {
  db.serialize(() => {
    db.run('UPDATE events SET title = ?, description = ?, timestamp = ?, location = ?, contact = ?, recurring = ?, image = ? WHERE id = ?;', [event.title, event.description, event.timestamp, event.location, event.contact, event.recurring, event.image, event.id]);
  });
  return event.id;
}

app.get('/event/:id', (req, res) => {
  getEvent(req.params.id)
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
});

app.get('/events', (req, res) => {
  getEvents().then(events => {
    res.json(events);
  }).catch(err => {
    console.error(err.message);
    res.status(500).send(err.message);
  });
})

app.post("/events", upload.single("image"), async (req, res) => {
  try {
    let imageS3Path = req?.body?.existing_image; // Keep existing image if no new one uploaded
    
    // Upload new image to S3 if provided
    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/images/events');
      imageS3Path = s3Result.fileName; // Store the S3 key/path in database
    }

    const event = {
      id: req.body?.id,
      title: req.body?.title,
      description: req.body?.description,
      timestamp: req.body?.timestamp,
      location: req.body?.location,
      contact: req.body?.contact,
      recurring: req.body?.recurring,
      image: imageS3Path,
    };

    let eventId;
    if (event?.id) {
      eventId = await updateEvent(event);
    } else {
      eventId = await createEvent(event);
    }

    const eventResponse = await getEvent(eventId);
    res.json(eventResponse);
    
  } catch (error) {
    console.error('Event upload error:', error);
    res.status(500).json({ 
      error: 'Event upload failed', 
      details: error.message 
    });
  }
});

app.put("/event/:id", upload.single("image"), async (req, res) => {
  try {
    let imageS3Path = req?.body?.existing_image; // Keep existing image if no new one uploaded
    
    // Upload new image to S3 if provided
    if (req.file) {
      const s3Result = await uploadToS3(req.file, 'media/images/events');
      imageS3Path = s3Result.fileName; // Store the S3 key/path in database
    }

    const event = {
      id: req.body?.id,
      title: req.body?.title,
      description: req.body?.description,
      timestamp: req.body?.timestamp,
      location: req.body?.location,
      contact: req.body?.contact,
      recurring: req.body?.recurring,
      image: imageS3Path,
    };

    const updatedEvent = await updateEvent(event);
    const eventResponse = await getEvent(event?.id);
    res.json(eventResponse);
    
  } catch (error) {
    console.error('Event update error:', error);
    res.status(500).json({ 
      error: 'Event update failed', 
      details: error.message 
    });
  }
});

app.delete('/event/:id', async(req, res ) => 
{
  await deleteEvent(req.params.id);

  res.status(200).send('Event deleted');
});

app.get('/migrate', async (req, res) => {


  // Function to delete all tables in the database
  const deleteAllTables = async () => {
    try {
      const tables = await dbAllAsync("SELECT name FROM sqlite_master WHERE type='table';", db);
      for (const table of tables) {
        if (table.name === 'sqlite_sequence') {
          continue;
        }
        await dbRunAsync(`DROP TABLE IF EXISTS ${table.name};`, db);
      }
      console.log('All tables deleted');
    } catch (err) {
      console.error('Error deleting tables:', err.message);
    }
  };

  const addData = (data, table) => {
    data.forEach(async row => {
      const keys = Object.keys(row);
      const values = Object.values(row);
      const placeholders = keys.map(() => '?').join(',');
      const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders});`;
      await db.dbAllAsync(sql, values, function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
          return;
        }
        console.log(`Row inserted with id ${this.lastID}`);
      });
    });
  }

  //drop all data
  await deleteAllTables();


  const articles = await dbAllAsync('SELECT * FROM pns_article;', db_old);
  const members = await dbAllAsync('SELECT * FROM pns_member;', db_old);
  const events = await dbAllAsync('SELECT * FROM pns_event;', db_old);
  const minutes = await dbAllAsync('SELECT * FROM pns_minute;', db_old);
  const login = [
    {
      id: uuidv4(),
      username: 'admin',
      password: 'admin',
    },
    {
      id: uuidv4(),
      username: 'karkik',
      password: 'Society@71',
    },
    {
      id: uuidv4(),
      username: 'khatiwadak',
      password: 'Society@72',
    },
    {
      id: uuidv4(),
      username: 'sedhainn',
      password: 'Society@73',
    },
    {
      id: uuidv4(),
      username: 'adhikarim',
      password: 'Society@74',
    },
  ]

  const data = {
    articles,
    members,
    events,
    minutes,
  };

  await dbRunAsync('CREATE TABLE articles (id TEXT PRIMARY KEY, title TEXT, date TEXT, text TEXT, is_event INTEGER, is_aid INTEGER, is_guest INTEGER, is_project INTEGER, is_home INTEGER, is_sport INTEGER);', db);
  await dbRunAsync('CREATE TABLE article_images (id TEXT PRIMARY KEY, article TEXT, image TEXT);', db);
  await dbRunAsync('CREATE TABLE members (id TEXT PRIMARY KEY, name TEXT, image TEXT, role TEXT, position TEXT, "order" INTEGER);', db);
  await dbRunAsync('CREATE TABLE minutes (id TEXT PRIMARY KEY, "title" TEXT, file TEXT, description TEXT, date TEXT);', db);
  await dbRunAsync('CREATE TABLE events (id TEXT PRIMARY KEY, title TEXT, description TEXT, timestamp TEXT, "location" TEXT, "contact" TEXT, recurring TEXT, image TEXT);', db);
  await dbRunAsync('CREATE TABLE login (id TEXT PRIMARY KEY, username TEXT, password TEXT);', db);

  articles.forEach(async article => {
    const articleId = uuidv4();
    // convert article.date to timestamp
    article.date = new Date(article.date).toISOString();

    // Convert old local image paths to new S3 structure
    let s3ImagePath = article.image;
    if (article.image && !article.image.startsWith('http')) {
      const formatedImage = article.image.split('article_imgs/').join('');
      s3ImagePath = `${environment === 'production' ? 'prod' : 'dev'}/media/article/${formatedImage}`;
    }

    await dbRunAsync('INSERT INTO articles (id, title, date, text, is_event, is_aid, is_guest, is_project, is_home, is_sport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', db, [articleId, article.title, article.date, article.text, article.event, article.aid, article.guest, article.project, article.home, article.sport]);
    await dbRunAsync('INSERT INTO article_images (id, article, image) VALUES (?, ?, ?);', db, [uuidv4(), articleId, s3ImagePath]);
  });

  members.forEach(async member => {
    const memberId = uuidv4();
    // Image paths are now S3 paths - update accordingly
    let s3ImagePath = member.image;
    if (member.image && !member.image.startsWith('http')) {
      // Convert old local paths to new S3 structure if needed
      const formatedImage = member.image.split('member_imgs/').join('');
      s3ImagePath = `${environment === 'production' ? 'prod' : 'dev'}/media/member/${formatedImage}`;
    }
    
    let role
    if (member.position === 'Trustee' || member.position === 'Advisor' || member.position === 'Member' || member.position === 'Volunteer') {
      role = member.position;
    } else {
      role = 'Management';
    }
    await dbRunAsync('INSERT INTO members (id, name, image, role, position, "order") VALUES (?, ?, ?, ?, ?, ?);', db, [memberId, member.name, s3ImagePath, role, member.position, member.order]);
  });


  defaultEvents.forEach(async event => {
    const eventId = uuidv4();
    await dbRunAsync('INSERT INTO events (id, title, description, timestamp, "location", "contact", recurring) VALUES (?, ?, ?, ?, ?, ?, ?);', db, [eventId, event.title, event.description, event.timestamp, event.location, event.contact, event.recurring]);
  });

  minutes.forEach(async minute => {
    const minuteId = uuidv4();
    // Convert old local file paths to new S3 structure
    let s3FilePath = minute.file;
    if (minute.file && !minute.file.startsWith('http')) {
      const formatedFile = minute.file.split('minute_docs/').join('');
      s3FilePath = `${environment === 'production' ? 'prod' : 'dev'}/media/minute/${formatedFile}`;
    }
    minute.date = new Date(minute.date).toISOString();
    await dbRunAsync('INSERT INTO minutes (id, title, file, description, date) VALUES (?, ?, ?, ?, ?);', db, [minuteId, s3FilePath, s3FilePath, minute.description, minute.date]);
  });

  login.forEach(async user => {
    await dbRunAsync('INSERT INTO login (id, username, password) VALUES (?, ?, ?);', db, [user.id, user.username, user.password]);
  });

  res.json(data);
})


const isLoginValid = async (username, password) => {
  const user = await dbAllAsync(`SELECT * FROM login WHERE username = '${username}' AND password = '${password}';`, db);
  return user.length > 0;
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const isValid = await isLoginValid(username, password);
  if (isValid) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});

app.get('/gallery', async (req, res) => {
  try {
    // 1. Get all images from article_images and join with articles to get the date
    const articleImagesRaw = await dbAllAsync(`
      SELECT ai.id, ai.image, a.date
      FROM article_images ai
      JOIN articles a ON ai.article = a.id
      ORDER BY a.date DESC;
    `, db);

    const articleImages = articleImagesRaw.map(img => ({
      id: img.id,
      s3_key: getS3Url('article', img.image),
      type: 'image',
      name: 'Article Image', // Placeholder name
      date: img.date
    }));

    // 2. Get all media items marked for gallery
    const mediaItemsRaw = await dbAllAsync('SELECT * FROM media WHERE is_gallery = 1 ORDER BY created_at DESC;', db);
    const mediaItems = mediaItemsRaw.map(item => ({
      ...item,
      s3_key: getS3Url('media', item.s3_key),
      date: item.created_at // Assuming media has a created_at timestamp
    }));

    // 3. Combine and sort by date
    const galleryItems = [...mediaItems, ...articleImages];
    galleryItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(galleryItems);

  } catch (error) {
    console.error('Error fetching gallery data:', error);
    res.status(500).json({ error: 'Failed to fetch gallery data', details: error.message });
  }
});

const mapImagesToArticles = async (articles) => {
  const images = await dbAllAsync('SELECT * FROM article_images;', db);
  return articles.map(article => {
    const image = images.find(image => image.article === article.id);
    article.images = [{ image: getS3Url('article', image.image || []) }];
    return article;
  });
}

app.get('/home', async (req, res) => {
  const donations = await dbAllAsync('SELECT * FROM articles WHERE is_aid = 1 ORDER BY date DESC LIMIT 4;', db)
  const articles = await dbAllAsync(`
      SELECT * FROM articles
      WHERE id NOT IN (
        SELECT id FROM articles
        WHERE is_aid = 1
        ORDER BY date DESC
        LIMIT 5
      )
      ORDER BY date DESC
      LIMIT 4;
    `, db);
  const media = await dbAllAsync('SELECT * FROM media WHERE is_home = 1;', db);
  const memeberPresident = await dbAllAsync('SELECT * FROM members WHERE position = "President and Trustee" LIMIT 1;', db);
  const memberVicePresident = await dbAllAsync('SELECT * FROM members WHERE position = "Vice President" LIMIT 2;', db);
  const memberCoordinator = await dbAllAsync('SELECT * FROM members WHERE position = "Coordinator" LIMIT 1;', db);
  const eventsRaw = await dbAllAsync('SELECT * FROM events ORDER BY timestamp DESC LIMIT 3;', db);
  
  // Add S3 URLs to event images
  const events = eventsRaw.map(event => ({
    ...event,
    image: getS3Url('event', event.image)
  }));

  // Add S3 URLs to member images
  const addS3UrlToMembers = (members) => {
    return members.map(member => ({
      ...member,
      image: getS3Url('member', member.image)
    }));
  };

  const data = {
    media: media.map(item => ({...item, url: getS3Url('media', item.s3_key)})),
    donations: await mapImagesToArticles(donations),
    articles: await mapImagesToArticles(articles),
    members: {
      president: memeberPresident[0] ? { ...memeberPresident[0], image: getS3Url('member', memeberPresident[0].image) } : null,
      vicePresident: addS3UrlToMembers(memberVicePresident),
      coordinator: memberCoordinator[0] ? { ...memberCoordinator[0], image: getS3Url('member', memberCoordinator[0].image) } : null,
    },
    events
  }

  return res.json(data);
});

app.get('/article-screen/:id', async (req, res) => {
  const articles = await getArticles();
  const article = articles.find(article => article.id === req.params.id);
  const articleSuggestions = lodash.shuffle(articles).filter(article => article.id !== req.params.id).slice(0, 4);

  const data = {
    article,
    articleSuggestions,
  }

  res.json(data);  
});

if (process.env.NODE_ENV === 'development') {
  // Create HTTP server
  http.createServer(app).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/pnsuk.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/pnsuk.org/fullchain.pem')
  };

  // Create HTTPS server
  https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
  });
}


// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });