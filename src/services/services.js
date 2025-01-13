
import axios from "axios";
import formModeEnum from "./formModeEnum";

const getAllArticles = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/articles`);
  return response.data;
}

const getAllArticleSelectionItems = async () => {
  const response = await getAllArticles();
  const seletionItems = response.data.map((item) => ({
    id: item.id,
    text: item.title
  }));
  return seletionItems;
}

const getArticle = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/article/${id}`);
  return response.data;
}

const getAllMembers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/members`);
  return response.data;
}

const getAllMemberSelectionItems = async () => {
  const response = await getAllMembers();
  const seletionItems = response.data.map((item) => ({
    id: item.id,
    text: item.name
  }));
  return seletionItems;
}

const getMember = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/member/${id}`);
  return response.data;
}


const getAllMinutes = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/minutes`);
  return response.data;
}

const getMinute = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/minute/${id}`);
  return response.data;
}

const getAllEvents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/events`);
  return response.data;
}

const submitMinute = async (id, data, document, mode) => {
  const formData = new FormData();


  // Append text fields to formData
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", data.date);

  // Append the selected image to formData
  if (document?.file) {
    formData.append("document", document.file);
  } else {
    formData.append("existing_document", data.document);
  }

  if (mode === formModeEnum.UPDATE) {
    formData.append("id", id);
  }

  let response;
  if (mode === formModeEnum.CREATE) {
    response = await axios.post(`${process.env.REACT_APP_API}/minutes`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  } else if (mode === formModeEnum.UPDATE) {
    response = await axios.put(`${process.env.REACT_APP_API}/minutes/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  return response.data;
};

const submitMember = async (id, data, image, mode) => {
  const formData = new FormData();

  // Append text fields to formData
  formData.append("name", data.name);
  formData.append("position", data.position);
  formData.append("order", data.order);

  // Append the selected image to formData
  if (image?.file) {
    formData.append("image", image.file);
  } else {
    formData.append("existing_image", data.image);
  }

  if (mode === formModeEnum.UPDATE) {
    formData.append("id", id);
  }

  let response;
  if (mode === formModeEnum.CREATE) {
    response = await axios.post(`${process.env.REACT_APP_API}/member`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  } else if (mode === formModeEnum.UPDATE) {
    response = await axios.put(`${process.env.REACT_APP_API}/member/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  return response.data;
};

const submitArticle = async (data, images) => {
    const formData = new FormData();

    // Append text fields to formData
    if (data?.id) {
      formData.append("id", data.id);
    }
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("date", data.date);
    formData.append("is_event", data.is_event);
    formData.append("is_aid", data.is_aid);
    formData.append("is_guest", data.is_guest);
    formData.append("is_project", data.is_project);
    formData.append("is_home", data.is_home);
    formData.append("is_sport", data.is_sport);
    formData.append("type", "article");


    // Append the selected images to formData
    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
      else {
        formData.append("existing_images[]", image.image);
      }
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/article`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {

    }
  };


  const deleteArticleImage = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/article/image/${id}`);
      return response.data;
    } catch (error) {

    }
  }


  const fetch = axios.create({
    baseURL: 'http://localhost:3001', // Set your base URL here
    headers: {
      'Content-Type': 'application/json',
    },
  });
  




export {
  getAllArticleSelectionItems,
  getAllMemberSelectionItems,
  getAllArticles,
  getAllMembers,
  getArticle,
  getMember,
  getAllMinutes,
  getAllEvents,
  submitMinute,
  getMinute,
  submitMember,
  submitArticle,
  deleteArticleImage,
  fetch,
}