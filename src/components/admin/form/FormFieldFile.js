import React, { useState } from "react";

const FormFieldFile = (props) => {
  const { id, label, register, errors, validation, selectedFile, setSelectedFile, hasImage = false, labelClassName } = props;

  const fileImage = hasImage ? selectedFile?.image : ''

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: URL.createObjectURL(file),
        image: hasImage ? URL.createObjectURL(file) : null,
        file,
      });
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <input
        type="file"
        {...register(id, validation)}
        onChange={handleFileChange}
      />
      {errors[id] && <span>{errors[id].message}</span>}
      {selectedFile?.name && (
        <div>
          <img src={fileImage} alt="Preview" className="w-32 h-32 object-cover" />
          <p>{selectedFile.name}</p>
          <button type="button" onClick={handleDeleteFile}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default FormFieldFile;