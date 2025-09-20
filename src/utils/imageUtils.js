// Utility function to get the correct image URL with fallback
export const getImageUrl = (s3Url, localPath, baseFolder = '') => {
  // If S3 URL is provided and is a valid URL, use it
  if (s3Url && (s3Url.startsWith('http') || s3Url.startsWith('https'))) {
    return s3Url;
  }
  
  // If no S3 URL but local path exists, construct local path
  if (localPath) {
    const cleanPath = localPath.replace(/^\/+/, ''); // Remove leading slashes
    return `${process.env.REACT_APP_HOST}/assets/media/images/${baseFolder}/${cleanPath}`;
  }
  
  // Return placeholder or default image
  return `${process.env.REACT_APP_HOST}/assets/media/images/placeholder.jpg`;
};

// Utility for article images
export const getArticleImageUrl = (image) => {
  // For articles, the backend provides a 'url' field with the full S3 URL
  if (image?.url) {
    return image.url;
  }
  
  // Fallback to local path if no S3 URL
  if (image?.image) {
    return getImageUrl(null, image.image, 'articles');
  }
  
  return getImageUrl(null, null, 'articles');
};

// Utility for member images
export const getMemberImageUrl = (member) => {
  // For members, the backend provides an 'imageUrl' field with the full S3 URL
  if (member?.imageUrl) {
    return member.imageUrl;
  }
  
  // Fallback to local path if no S3 URL
  if (member?.image) {
    return getImageUrl(null, member.image, 'committee');
  }
  
  return getImageUrl(null, null, 'committee');
};

// Utility for file URLs (PDFs, documents)
export const getFileUrl = (s3Url, localPath, baseFolder = 'docs') => {
  // If S3 URL is provided and is a valid URL, use it
  if (s3Url && (s3Url.startsWith('http') || s3Url.startsWith('https'))) {
    return s3Url;
  }
  
  // If no S3 URL but local path exists, construct local path
  if (localPath) {
    const cleanPath = localPath.replace(/^\/+/, ''); // Remove leading slashes
    return `${process.env.REACT_APP_HOST}/assets/media/${baseFolder}/${cleanPath}`;
  }
  
  return null;
};

// Utility for minute files
export const getMinuteFileUrl = (minute) => {
  // Check if the backend provides a filePath (full S3 URL)
  if (minute?.filePath) {
    return minute.filePath;
  }
  
  // Fallback to constructing URL from file field
  if (minute?.file) {
    return getFileUrl(null, minute.file, 'docs/minutes');
  }
  
  return null;
};
