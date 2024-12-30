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
  const { selectedArticle } = props;
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

  // submit form
  const onSubmit = async (data) => {
    const response = await submitArticle(state.id, data, selectedImages, mode);
    reset();
    setSelectedImages([]);
  } 


  useEffect(() => {
    if (selectedArticle) {
      reset({
        id: selectedArticle.id,
        title: selectedArticle.title,
        text: selectedArticle.text,
        date: selectedArticle.date,
        is_event: selectedArticle.is_event,
        is_aid: selectedArticle.is_aid,
        is_guest: selectedArticle.is_guest,
        is_project: selectedArticle.is_project,
        is_home: selectedArticle.is_home,
        is_sport: selectedArticle.is_sport,
      });
      setSelectedImages(selectedArticle.images);
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (state?.id) {
      getArticle(state.id).then((data) => {
        reset(data);
        setSelectedImages(data.images);
        setMode(formModeEnum.UPDATE);
      });
    }
  }, [state]);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormFieldTextbox
          id="title"
          label="Title"
          register={register}
          errors={errors}
          validation={{
            required: "Enter the article title"
          }}
        />
        <FormFieldTextbox
          id="description"
          label="Description"
          register={register}
          errors={errors}
          validation={{
            required: "Enter the article description"
          }}
        />
        <FormFieldDate
          id="date"
          label="Date"
          register={register}
          errors={errors}
          validation={{
            required: "Enter the article date"
          }}
        />
        <FormFieldCheckbox
          id="is_event"
          label="Is Event"
          register={register}
          errors={errors}
          validation={{}}
        />
        <FormFieldCheckbox
          id="is_aid"
          label="Is Aid"
          register={register}
          errors={errors}
          validation={{}}
        />
        <FormFieldCheckbox
          id="is_guest"
          label="Is Guest"
          register={register}
          errors={errors}
          validation={{}}
        />
        <FormFieldCheckbox
          id="is_project"
          label="Is Project"
          register={register}
          errors={errors}
          validation={{}}
        />
        <FormFieldCheckbox
          id="is_home"
          label="Is Home"
          register={register}
          errors={errors}
          validation={{}}
        />
        <FormFieldCheckbox
          id="is_sport"
          label="Is Sport"
          register={register}
          errors={errors}
          validation={{}}
        />

          <label className="font-bold">Images</label>
          <FormFieldMultiFile
            id="images"
            register={register}
            errors={errors}
            validation={{}}
            selectedFiles={selectedImages}
            setSelectedFiles={setSelectedImages}
            onDeleteFile={deleteArticleImage}
          />
        <Button type="submit">Save</Button>

      </form>

    </>
  );
};


export default ArticleForm;
