import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../Button";

const FormFieldMultiFile = (props) => {
  const { id, label, register, errors, validation, selectedFiles, setSelectedFiles, onDeleteFile } = props;
  const fileInputRef = useRef(null);

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="font-bold">{label}</label>

      <input
        type="file"
        {...register(id, validation)}
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button type="button" onClick={handleClick}>
        Add Image +
      </Button>
      {errors[id] && <span>{errors[id].message}</span>}

      {selectedFiles.map((image, index) => (
        <div
          key={index}
          className="w-full flex gap-4 items-center my-2"
        >
          <img
            className="w-48 h-48 rounded-lg object-cover"
            src={image.image ? `${process.env.REACT_APP_HOST}/assets/media/images/articles/${image.image}` : URL.createObjectURL(image)}
            alt={image.image}
          />
          <div className="w-full flex flex-col gap-2">
            <span>{image.name || image.image}</span>
            <Button variant="red" type="button" onClick={() => handleDeleteFile(index)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormFieldMultiFile;