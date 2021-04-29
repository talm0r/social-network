import React, { useState } from "react";
import ImageUploader from "react-images-upload";

function ImageUploaderComponent ({parentCallback, defaultImage})  {
  const [pictures, setPictures] = useState();
  const onDrop = picture => {
    setPictures( picture);
    parentCallback('note_image',picture);
    
  };
  
  return (
    <ImageUploader
     
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      singleImage={true}
      withPreview={true}
      buttonText={'Choose image'}
      withIcon={false}
    
    />
  );
};

export default ImageUploaderComponent;