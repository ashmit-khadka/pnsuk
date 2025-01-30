import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router";
import { getMember } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";

const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
}

const EventForm = (props) => {
  const { selectedArticle } = props;
  const { state } = useLocation();

  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: " Default Title",
      description: " Default Description",
      date: " 10/10/2000",
      location: " 1",
      contact: " Contact",
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [mode, setMode] = useState(FORM_MODE.CREATE);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields to formData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("location", data.location);
    formData.append("contact", data.contact);

    // Append the selected image to formData
    if (selectedImage) {
      formData.append("image", selectedImage);
    } else {
      formData.append("existing_image", data.image);
    }

    if (mode === FORM_MODE.UPDATE) {
      formData.append("id", state.id);
    }

    try {
      let response;
      if (mode === FORM_MODE.CREATE) {
        response = await axios.post("http://localhost:3001/events", formData, {
          headers: { "Content-Type": "application/json" }
        });
      } else if (mode === FORM_MODE.UPDATE) {
        response = await axios.put(`http://localhost:3001/event/${state.id}`, formData, {
          headers: { "Content-Type": "application/json" }
        });
      }

      reset(response.data); // Clear the form after successful submission
      setSelectedImage(null); // Clear the selected image

      navigate(`/list/`);
    } catch (error) {
      console.error("Error uploading files and text data:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedArticle) {
      reset(selectedArticle);
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (state?.id) {
      getMember(state.id).then((data) => {
        reset(data);
        setSelectedImage({
          name: data.image,
          preview: `${process.env.REACT_APP_HOST}/assets/images/${data.image}`
        })
        setMode(FORM_MODE.UPDATE);
      });
    }
  }, [state]);

  console.log(mode);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-page mx-auto p-6 bg-themeLight rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-themeDark font-bold mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          {...register("title", { required: true })}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
        {errors.title && <span className="text-red-500">Title is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-themeDark font-bold mb-2">Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
        {errors.description && <span className="text-red-500">Description is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-themeDark font-bold mb-2">Date</label>
        <input
          type="text"
          placeholder="Enter Date"
          {...register("date", { required: true })}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
        {errors.date && <span className="text-red-500">Date is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-themeDark font-bold mb-2">Location</label>
        <input
          type="text"
          placeholder="Enter Location"
          {...register("location", { required: true })}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
        {errors.location && <span className="text-red-500">Location is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-themeDark font-bold mb-2">Contact</label>
        <input
          type="text"
          placeholder="Enter Contact"
          {...register("contact", { required: true })}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
        {errors.contact && <span className="text-red-500">Contact is required</span>}
      </div>
      <button type="submit" className="bg-themePrimary text-white font-bold py-2 px-4 rounded hover:bg-themeDark">
        Save
      </button>
    </form>
  );
};

export default EventForm;