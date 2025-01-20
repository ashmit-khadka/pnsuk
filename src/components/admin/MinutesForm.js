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
<form onSubmit={handleSubmit(onMinuteSubmit)} className="max-w-page mx-auto p-6 bg-themeLight rounded-lg shadow-md">
      <div className="mb-4">
        <FormFieldTextbox
          id="title"
          label="Title"
          register={register}
          errors={errors}
          validation={{
            required: "Enter the minute title"
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
        <FormFieldDate
          id="date"
          label="Date"
          register={register}
          errors={errors}
          validation={{
            required: "Enter the minute date"
          }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
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
          className="w-full px-3 py-2 border border-themeDark rounded-md"
          labelClassName="text-themeDark font-bold mb-2"
        />
      </div>
      <button type="submit" className="bg-themePrimary text-white font-bold py-2 px-4 rounded hover:bg-themeDark">
        Save
      </button>
    </form>
  );
};

export default MinutesForm;