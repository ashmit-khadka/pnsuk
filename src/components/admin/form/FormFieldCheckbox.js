import React from "react";

const FormFieldCheckbox = (props) => {
  const { id, label, register, errors, validation } = props;

  return (
    <div className="flex gap-4">
      <label className="font-bold">
        {label}
      </label>
      <input
          type="checkbox"
          {...register(id, validation)}
        />
      {errors[id] && <span>{errors[id].message}</span>}
    </div>
  );
};

export default FormFieldCheckbox;