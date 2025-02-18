import React from "react";

const FormFieldTextbox = (props) => {
  const { id, label, placeholder, register, errors, validation, type = "text" } = props;

  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <input
      className="border border-gray-300 p-2"
        type={type}
        placeholder={placeholder}
        {...register(id, validation)}
      />
      {errors[id] && <span>{errors[id].message}</span>}
    </div>
  );
};

export default FormFieldTextbox;