import axios from "axios";
import formModeEnum from "./formModeEnum";
import { convertToISOFormat } from "./formatDate";
import { toast } from 'react-toastify';

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

const getEvent = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/event/${id}`);
  return response.data;
}

const getAllEvents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/events`);
  return response.data;
}

const submitMinute = async (data, document) => {
  const formData = new FormData();

  if (data?.id) {
    formData.append("id", data.id);
  }

  // Append text fields to formData
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("type", "minutes");

  // Append the selected image to formData
  if (document?.file) {
    formData.append("document", document.file);
  } else {
    formData.append("existing_document", data.document);
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/minutes`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    toast.success(`Minute ${data?.id ? 'updated' : 'created'} successfully`);
    return response.data;
  } catch (error) {

  }
};

const submitMember = async (data, image) => {
  const formData = new FormData();

  if (data?.id) {
    formData.append("id", data.id);
  }
  formData.append("name", data.name);
  formData.append("position", data.position);
  formData.append("order", data.order);
  formData.append("role", data.role);
  formData.append("type", "committee");

  // Append the selected image to formData
  if (image?.file) {
    formData.append("image", image.file);
  } else {
    formData.append("existing_image", data.image);
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/member`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    toast.success(`Member ${data?.id ? 'updated' : 'created'} successfully`);
    return response.data;
  } catch (error) {

  }
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
    toast.success(`Article ${data?.id ? 'updated' : 'created'} successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error creating article`);
  }
};


const submitEvent = async (data, image) => {
  const formData = new FormData();
  
  data.timestamp = convertToISOFormat(data.timestamp);

  if (data?.id) {
    formData.append("id", data.id);
  }

  // Append text fields to formData
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("timestamp", data.timestamp);
  formData.append("location", data.location);
  formData.append("contact", data.contact);
  formData.append("recurring", data.recurring);
  formData.append("type", "event");

  // Append the selected image to formData
  if (image?.file) {
    formData.append("image", image.file);
  } else {
    formData.append("existing_image", data.image);
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/events`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    toast.success(`Event ${data?.id ? 'updated' : 'created'} successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error creating event`);
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
  baseURL: process.env.REACT_APP_API, // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});


const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/member/${id}`);
    toast.success(`Member deleted successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error deleting member`);
  }
}

const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/article/${id}`);
    toast.success(`Article deleted successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error deleting article`);
  }
}

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/event/${id}`);
    toast.success(`Event deleted successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error deleting event`);
  }
}

const deleteMinute = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/minutes/${id}`);
    toast.success(`Minute deleted successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error deleting minute`);
  }
}

const getMedia = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/media`);
  return response.data;
}

const getMediaItem = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/media/${id}`);
  return response.data;
}

const submitMedia = async (data, image) => {
  const formData = new FormData();

  if (data?.id) {
    formData.append("id", data.id);
  }

  formData.append("name", data.name);
  formData.append("link", data.link);
  formData.append("is_home", data.is_home);
  formData.append("is_gallery", data.is_gallery);

  if (image?.file) {
    formData.append("image", image.file);
  } else {
    formData.append("existing_image", data.image);
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/media`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    toast.success(`Media ${data?.id ? 'updated' : 'created'} successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error saving media`);
  }
};

const deleteMedia = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/media/${id}`);
    toast.success(`Media deleted successfully`);
    return response.data;
  } catch (error) {
    toast.error(`Error deleting media`);
  }
}




export {
  getAllArticleSelectionItems,
  getAllMemberSelectionItems,
  getAllArticles,
  getAllMembers,
  getArticle,
  getMember,
  getEvent,
  getAllMinutes,
  getAllEvents,
  submitMinute,
  getMinute,
  submitMember,
  submitArticle,
  deleteArticleImage,
  fetch,
  submitEvent,
  deleteMember,
  deleteArticle,
  deleteEvent,
  deleteMinute,
  getMedia,
  getMediaItem,
  submitMedia,
  deleteMedia
}