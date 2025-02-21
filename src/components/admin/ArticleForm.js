import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import { getArticle, submitArticle, deleteArticleImage, deleteArticle } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";
import FormFieldCheckbox from "./form/FormFieldCheckbox";
import FormFieldMultiFile from "./form/FormFieldMultiFile";
import formModeEnum from "../../services/formModeEnum";
import Button from "../Button";


const ArticleForm = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isEditMode = state?.id ? true : false;

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    // defaultValues: {
    //   title: "",
    //   description: "",
    //   text: "",
    //   date: null,
    //   is_event: false,
    //   is_aid: false,
    //   is_guest: false,
    //   is_project: false,
    //   is_home: false,
    //   is_sport: false,
    //   images: []
    // }
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const resetForm = (article) => {
    reset({
      id: article.id,
      title: article.title,
      text: article.text,
      date: article.date,
      is_event: article.is_event,
      is_aid: article.is_aid,
      is_guest: article.is_guest,
      is_project: article.is_project,
      is_home: article.is_home,
      is_sport: article.is_sport,
    });
    setSelectedImages(article.images);
  }

  // submit form
  const onSubmit = async (data) => {
    const response = await submitArticle(data, selectedImages);
    //resetForm(response);
    navigate('/admin/dashboard/articles');
  }

  const onDelete = async (id) => {
    await deleteArticle(id);
    navigate(-1);
  }

  useEffect(() => {
    if (state?.id) {
      getArticle(state.id).then((data) => {
        resetForm(data);
      });
    }
  }, [state]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-page w-full">
        <div className="mb-4">
          <FormFieldTextbox
            id="title"
            label="Title"
            register={register}
            errors={errors}
            validation={{
              required: "Enter the article title"
            }}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        <div className="mb-4">
          <FormFieldTextbox
            id="text"
            label="Description"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        <div className="mb-4">
          <FormFieldDate
            id="date"
            label="Date"
            register={register}
            errors={errors}
            validation={{
              required: "Enter the article date"
            }}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <FormFieldCheckbox
            id="is_event"
            label="Is Event"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div> */}
        <div className="mb-4">
          <FormFieldCheckbox
            id="is_aid"
            label="Include in Donations section of project page"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <FormFieldCheckbox
            id="is_guest"
            label="Is Guest"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div> */}
        {/* <div className="mb-4">
          <FormFieldCheckbox
            id="is_project"
            label="Is Project"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div> */}
        {/* <div className="mb-4">
          <FormFieldCheckbox
            id="is_home"
            label="Is Home"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div> */}
        <div className="mb-4">
          <FormFieldCheckbox
            id="is_sport"
            label="Include in Sports section of project page"
            register={register}
            errors={errors}
            validation={{}}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-themeDark font-bold mb-2">Images</label>
          <FormFieldMultiFile
            id="images"
            register={register}
            errors={errors}
            validation={{}}
            selectedFiles={selectedImages}
            setSelectedFiles={setSelectedImages}
            onDeleteFile={deleteArticleImage}
            className="w-full px-3 py-2 border border-themeDark rounded-md"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="default" type="submit" disabled={!isDirty}>Save</Button>
          <Button variant="default" type="button" onClick={() => navigate(-1)}>{isDirty ? 'Cancel' : 'Back'}</Button>
          {
            isEditMode &&
            <Button variant="red" type="button" onClick={() => onDelete(state.id)}>Delete</Button>
          }
        </div>
      </form>

    </>
  );
};


export default ArticleForm;
