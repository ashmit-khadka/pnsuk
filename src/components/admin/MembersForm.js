import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import { getMember, submitMember } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldFile from "./form/FormFieldFile";

const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
}

const MemberForm = (props) => {
  const { state } = useLocation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "Default Name",
      image: "Default Image",
      position: "Advisor",
      order: 1,
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [mode, setMode] = useState(FORM_MODE.CREATE);

  const updateForm = (data) => {
    reset({
      name: data.name,
      image: data.image,
      position: data.position,
      order: data.order,
    });
    setSelectedImage({
      name: data.image,
      preview: `${process.env.REACT_APP_HOST}/assets/images/${data.image}`
    })
  }

  const onSubmit = async (data) => {
    const response = await submitMember(state.id, data, selectedImage, mode);
    updateForm(response)
    setSelectedImage(null);
  };

  useEffect(() => {
    if (state?.id) {
      getMember(state.id).then((data) => {
        updateForm(data)
        setMode(FORM_MODE.UPDATE);
      });
    }
  }, [state]);

  return (
<form onSubmit={handleSubmit(onSubmit)} className="max-w-page mx-auto p-6 bg-themeLight rounded-lg shadow-md">
  <div className="mb-4">
    <FormFieldTextbox
      id="name"
      label="Name"
      register={register}
      errors={errors}
      validation={{
        required: "Enter the member name"
      }}
      className="w-full px-3 py-2 border border-themeDark rounded-md"
    />
  </div>
  <div className="mb-4">
    <FormFieldTextbox
      id="position"
      label="Position"
      register={register}
      errors={errors}
      validation={{
        required: "Enter the member position"
      }}
      className="w-full px-3 py-2 border border-themeDark rounded-md"
    />
  </div>
  <div className="mb-4">
    <FormFieldTextbox
      id="order"
      label="Order"
      register={register}
      errors={errors}
      validation={{
        required: "Enter the member order"
      }}
      className="w-full px-3 py-2 border border-themeDark rounded-md"
    />
  </div>
  <div className="mb-4">
    <FormFieldFile
      id="image"
      label="Image"
      register={register}
      errors={errors}
      validation={{
        //required: "Upload the minute document"
      }}
      selectedFile={selectedImage}
      setSelectedFile={setSelectedImage}
      hasImage={true}
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

export default MemberForm;