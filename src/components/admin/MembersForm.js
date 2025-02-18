import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import { getMember, submitMember, deleteMember } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldFile from "./form/FormFieldFile";
import FormFieldDropdown from "./form/FormFieldDropdown";
import Button from "../Button";
import { toast } from 'react-toastify';

const MemberForm = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isEditMode = state?.id ? true : false;

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    defaultValues: {
      name: "New Member Name",
      image: "New Member Image",
      role: "Advisor",
      position: "Advisor",
      order: 1,
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const updateForm = (data) => {
    reset({
      id: data.id,
      name: data.name,
      image: data.image,
      position: data.position,
      role: data.role,
      order: data.order,
    });
    setSelectedImage({
      name: data.image,
      preview: `${process.env.REACT_APP_HOST}/assets/media/images/committee/${data.image}`
    })
  }

  const onSubmit = async (data) => {
    const response = await submitMember(data, selectedImage);
    updateForm(response)
    navigate(-1);
  };

  const onDelete = async (id) => {
    await deleteMember(id);
    navigate(-1);
  }

  useEffect(() => {
    if (isEditMode) {
      getMember(state.id).then((data) => {
        updateForm(data)
      });
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-page w-full">
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
        <FormFieldDropdown
          id="role"
          label="Role"
          register={register}
          errors={errors}
          validation={{
            required: "Select the member role"
          }}
          options={[
            { value: "Management", label: "Management" },
            { value: "Trustee", label: "Trustee" },
            { value: "Volunteer", label: "Volunteer" },
            { value: "Member", label: "Member" },
            { value: "Advisor", label: "Advisor" }
          ]}
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
      <div className="flex justify-end gap-4">
        <Button variant="default" type="submit" disabled={!isDirty}>Save</Button>
        <Button variant="default" type="button" onClick={() => navigate(-1)}>Cancel</Button>
        {
          isEditMode &&
          <Button variant="red" type="button" onClick={() => onDelete(state.id)}>Delete</Button>
        }
      </div>
    </form>
  );
};

export default MemberForm;