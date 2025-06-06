import React, { useRef } from "react";
import Button from "../../Button";
import { has } from "lodash";

const FormFieldFile = (props) => {
  const { id, label, register, errors, validation, selectedFile, setSelectedFile, hasImage = false, labelClassName } = props;
  const fileInputRef = useRef(null);

  const fileImage = hasImage ? (selectedFile?.image || selectedFile?.preview) : `${process.env.REACT_APP_HOST}/assets/media/images/defaults/file.jpeg`;
  const fileName = selectedFile?.file?.name || selectedFile?.name;

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const onOpenFile = () => {
    window.open(selectedFile?.preview, '_blank');
  };

  const getButtonLabel = () => {
    if (selectedFile?.name) {
      return hasImage ? 'Change Image' : 'Change File';
    }
    return hasImage ? 'Add Image +' : 'Add File +';
  };

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <input
        type="file"
        {...register(id, validation)}
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      <Button type="button" onClick={handleClick}>
        {getButtonLabel()}
      </Button>

      {errors[id] && <span>{errors[id].message}</span>}
      {selectedFile?.name && (
        <div
          className="w-full flex gap-4 items-center my-2"
        >
          <img
            className="w-48 h-48 rounded-lg object-cover"
            src={fileImage}
            alt="Preview"
          />
          <div className="w-full flex flex-col gap-2">
            <span onClick={() => onOpenFile()}>{fileName}</span>
            <Button variant="red" type="button" onClick={handleDeleteFile}>Delete</Button>
          </div>

        </div>
      )}
    </div>
  );
};

export default FormFieldFile;