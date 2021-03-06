import React from "react";
import ImageUploader from "react-images-upload";

function ImageUploaderComponent ({parentCallback})  {
  const onDrop = picture => {
    parentCallback('image',picture);
  };
  
  return (
    <ImageUploader
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
      maxFileSize={5242880}
      singleImage={true}
      withPreview={true}
      buttonText={'Choose image'}
    />
  );
};

export default ImageUploaderComponent;