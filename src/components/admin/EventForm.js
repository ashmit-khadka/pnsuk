import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router";
import { deleteEvent, getEvent } from "../../services/services";
import FormFieldTextbox from "./form/FormFieldTextbox";
import FormFieldDate from "./form/FormFieldDate";
import FormFieldDropdown from "./form/FormFieldDropdown";
import Button from "../Button";
import { submitEvent } from "../../services/services";

const EventForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEditMode = state?.id ? true : false;
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    // defaultValues: {
    //   title: "Default Title",
    //   description: "Default Description",
    //   date: "2024-12-29T09:00:00",
    //   location: "Location",
    //   contact: "Contact",
    //   recurring: "none",
    // }
  });

  const onSubmit = async (data) => {
    const response = await submitEvent(data);
    //updateForm(response)
    navigate('/admin/dashboard/events');
  };

  const updateForm = (event) => {
    reset({
      id: event.id,
      title: event.title,
      description: event.description,
      timestamp: new Date(event.timestamp).toISOString().slice(0, 16), // Convert timestamp to datetime-local format
      location: event.location,
      contact: event.contact,
      recurring: event.recurring,
    });
  }

  const onDelete = async (id) => {
    await deleteEvent(id);
    navigate(-1);
  }

  useEffect(() => {
    if (state?.id) {
      getEvent(state.id).then((data) => {
        updateForm(data);
      });
    }
  }, [state, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-page w-full">
      <div className="mb-4">
        <FormFieldTextbox
          id="title"
          label="Title"
          register={register}
          errors={errors}
          validation={{ required: "Enter the event title" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldTextbox
          id="description"
          label="Description"
          register={register}
          errors={errors}
          validation={{ required: "Enter the event description" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldDate
          id="timestamp"
          label="Date"
          register={register}
          errors={errors}
          validation={{ required: "Enter the event date" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldTextbox
          id="location"
          label="Location"
          register={register}
          errors={errors}
          validation={{ required: "Enter the event location" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldTextbox
          id="contact"
          label="Contact"
          register={register}
          errors={errors}
          validation={{ required: "Enter the event contact" }}
          className="w-full px-3 py-2 border border-themeDark rounded-md"
        />
      </div>
      <div className="mb-4">
        <FormFieldDropdown
          id="recurring"
          label="Recurring"
          register={register}
          errors={errors}
          validation={{ required: "Select the recurring option" }}
          options={[
            { value: "none", label: "None" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" }
          ]}
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

export default EventForm;