import React from "react";

const FormFieldDate = ({ id, label, register, errors, validation }) => {
  return (
    <div className="mb-4">
      <label className="font-bold mb-2">{label}</label>
      <input
        type="datetime-local"
        id={id}
        {...register(id, validation)}
        className="w-full px-3 py-2 border border-themeDark rounded-md"
      />
      {errors[id] && <span className="text-red-500">{errors[id].message}</span>}
    </div>
  );
};

export default FormFieldDate;