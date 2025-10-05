import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import { getMediaItem, submitMedia, deleteMedia } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldFile from "./form/FormFieldFile";
import FormFieldCheckbox from "./form/FormFieldCheckbox";
import Button from "../Button";
import { toast } from 'react-toastify';

const MediaForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEditMode = state?.id ? true : false;

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      getMediaItem(state.id).then((data) => {
        reset({
          id: data.id,
          name: data.name,
          link: data.link,
          is_home: data.is_home,
          is_gallery: data.is_gallery,
          image: data.s3_key,
        });
        setSelectedImage({
          name: data.s3_key,
          preview: data.s3_key,
        });
      });
    }
  }, [state, isEditMode, reset]);

  const onSubmit = async (data) => {
    await submitMedia(data, selectedImage);
    navigate('/admin/dashboard/media');
  };

  const onDelete = async (id) => {
    await deleteMedia(id);
    navigate('/admin/dashboard/media');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-page w-full">
      <div className="mb-4">
        <FormFieldTextbox
          id="name"
          label="Name"
          register={register}
          errors={errors}
          validation={{ required: "Enter a name for the media" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldTextbox
          id="link"
          label="Link"
          register={register}
          errors={errors}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldFile
          id="image"
          label="Image"
          register={register}
          errors={errors}
          //validation={{ required: !isEditMode && "Please upload an image" }}
          selectedFile={selectedImage}
          setSelectedFile={setSelectedImage}
          hasImage={true}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
          labelClassName="text-themeDark font-bold mb-2"
        />
      </div>
      <div className="mb-4 flex gap-4">
        <FormFieldCheckbox
          id="is_home"
          label="Show on Home Screen"
          register={register}
          errors={errors}
        />
        <FormFieldCheckbox
          id="is_gallery"
          label="Show in Gallery"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="default" type="submit">Save</Button>
        <Button variant="default" type="button" onClick={() => navigate(-1)}>Cancel</Button>
        {isEditMode && (
          <Button variant="red" type="button" onClick={() => onDelete(state.id)}>Delete</Button>
        )}
      </div>
    </form>
  );
};

export default MediaForm;
