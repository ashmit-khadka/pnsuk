import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import { getMember, getMinute, submitMinute } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";
import FormFieldFile from "./form/FormFieldFile";

const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
}

const MinutesForm = (props) => {
  const { state } = useLocation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "Exmple title",
      description: "Example description",
      date: new Date().toISOString().split('T')[0],
      order: 1,
    }
  });

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [mode, setMode] = useState(FORM_MODE.CREATE);

  const updateForm = (data) => {    reset({
      title: data.title,
      description: data.description,
      date: data.date,
      document: data.file,
    });
    setSelectedDocument({
      name: data.file,
      file: null,
    })
  }

  const onMinuteSubmit = async (data) => {
    const response = await submitMinute(state.id, data, selectedDocument, mode);
    updateForm(response)    
    setSelectedDocument(null);
  };


  useEffect(() => {
    if (state?.id) {
      getMinute(state.id).then((data) => {
        updateForm(data)
        setMode(FORM_MODE.UPDATE);
      });
    }
  }, [state]);


  return (
    <form onSubmit={handleSubmit(onMinuteSubmit)}>
      <FormFieldTextbox
        id="title"
        label="Title"
        register={register}
        errors={errors}
        validation={{
          required: "Enter the minute title"
        }}
      />
      <FormFieldTextbox
        id="description"
        label="Description"
        register={register}
        errors={errors}
        validation={{}}
      />
      <FormFieldDate
        id="date"
        label="Date"
        register={register}
        errors={errors}
        validation={{
          required: "Enter the minute date"
        }}
      />
      <FormFieldFile
        id="document"
        label="Document"
        register={register}
        errors={errors}
        validation={{
          //required: "Upload the minute document"
        }}
        selectedFile={selectedDocument}
        setSelectedFile={setSelectedDocument}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default MinutesForm;