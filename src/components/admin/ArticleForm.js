import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import { getArticle, submitArticle, deleteArticleImage } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";
import FormFieldCheckbox from "./form/FormFieldCheckbox";
import FormFieldMultiFile from "./form/FormFieldMultiFile";
import formModeEnum from "../../services/formModeEnum";
import { Button } from "react-bootstrap";


const ArticleForm = (props) => {
  const { state } = useLocation();
  const [mode, setMode] = useState(formModeEnum.CREATE);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "Default Title",
      description: "ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum id, tincidunt nunc",
      text: "Default Text",
      date: new Date().toISOString().split('T')[0],
      is_event: false,
      is_aid: false,
      is_guest: false,
      is_project: false,
      is_home: true,
      is_sport: false,
      images: []
    }
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
    resetForm(response);
  } 

  useEffect(() => {
    if (state?.id) {
      getArticle(state.id).then((data) => {
        resetForm(data);
        setMode(formModeEnum.UPDATE);
      });
    }
  }, [state]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-page mx-auto p-6 bg-themeLight rounded-lg shadow-md">
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
          id="description"
          label="Description"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldTextbox
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
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_event"
          label="Is Event"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_aid"
          label="Is Aid"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_guest"
          label="Is Guest"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_project"
          label="Is Project"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_home"
          label="Is Home"
          register={register}
          errors={errors}
          validation={{}}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldCheckbox
          id="is_sport"
          label="Is Sport"
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
      <button type="submit" className="bg-themePrimary text-white font-bold py-2 px-4 rounded hover:bg-themeDark">
        Save
      </button>
    </form>

    </>
  );
};


export default ArticleForm;
