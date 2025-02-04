import React from "react";

const FormFieldDropdown = ({ id, label, register, errors, validation, options }) => {
  return (
    <div className="mb-4">
      <label className="font-bold mb-2">{label}</label>
      <select
        id={id}
        {...register(id, validation)}
        className="w-full px-3 py-2 border border-themeDark rounded-md"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[id] && <span className="text-red-500">{errors[id].message}</span>}
    </div>
  );
};

export default FormFieldDropdown;