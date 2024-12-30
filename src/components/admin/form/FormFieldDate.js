import React from "react";

const FormFieldDate = (props) => {
  const { id, label, register, errors, validation } = props;

  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <input
        className="border border-gray-300 p-2"
        type="date"
        {...register(id, validation)}
      />
      {errors[id] && <span>{errors[id].message}</span>}
    </div>
  );
};

export default FormFieldDate;