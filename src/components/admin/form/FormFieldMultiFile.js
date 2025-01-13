import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FormFieldFile from "./FormFieldFile";
import { Button } from "react-bootstrap";

const FormFieldMultiFile = (props) => {
  const { id, label, register, errors, validation, selectedFiles, setSelectedFiles, onDeleteFile } = props;


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleDeleteFile = async (index) => {
    const file = selectedFiles[index];
    if (file?.id) {
      await onDeleteFile(file.id);
    }

    const newFiles = selectedFiles.filter((file, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div>
      <label className="font-bold">{label}</label>

      <input
        type="file"
        {...register(id, validation)}
        onChange={handleImageChange}
      />
      {errors[id] && <span>{errors[id].message}</span>}

      {selectedFiles.map((image, index) => (
        <div
          key={index}
          className="flex gap-4 items-center my-2"
        >
          <img
            className="w-48 h-48 rounded-lg object-cover"
            src={`${process.env.REACT_APP_API}/assets/media/images/articles/${image.image}`}
            alt={image.image}
          />
          <div className="flex flex-col">
            <span>{image.name || image.image}</span>
            <Button variant="danger" type="button" onClick={() => handleDeleteFile(index)}>Delete</Button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default FormFieldMultiFile;