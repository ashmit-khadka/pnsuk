import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import { getMinute, submitMinute, deleteMinute } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";
import FormFieldFile from "./form/FormFieldFile";
import Button from "../Button";

const MinutesForm = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEditMode = state?.id ? true : false;

  const { register, handleSubmit, formState: { errors, isDirty }, reset, } = useForm({
    // defaultValues: {
    //   title: "Exmple title",
    //   description: "Example description",
    //   date: new Date().toISOString().split('T')[0],
    //   order: 1,
    // }
  });

  const [selectedDocument, setSelectedDocument] = useState(null);

  // update the form with the data from the selected minute
  const updateForm = (data) => {
    reset({
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      document: data.file,
    });
    setSelectedDocument({
      name: data.file,
      file: null,
      preview: `${process.env.REACT_APP_HOST}/${data.filePath}`
    })
  }

  // submit the minute data to the server
  const onSubmit = async (data) => {
    await submitMinute(data, selectedDocument);
    navigate('/admin/dashboard/minutes');
  };

  // get the minute data from the server
  const getSelectedMinute = async (id) => {
    const response = await getMinute(id);
    updateForm(response);
  }

  // delete the selected minute
  const onDelete = async (id) => {
    await deleteMinute(id);
    navigate('/admin/dashboard/minutes');
  }

  useEffect(() => {
    if (isEditMode) {
      getSelectedMinute(state.id);
    }
  }, [state]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-page w-full">
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
      <div className="flex justify-end gap-4">
        <Button variant="default" type="submit" >Save</Button>
        <Button variant="default" type="button" onClick={() => navigate(-1)}>Cancel</Button>
        {
          isEditMode &&
          <Button variant="red" type="button" onClick={() => onDelete(state.id)}>Delete</Button>
        }
      </div>
    </form>
  );
};

export default MinutesForm;