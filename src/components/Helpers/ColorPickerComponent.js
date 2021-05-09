import React from 'react';
import { CirclePicker } from 'react-color';
import { useState } from "react";


function ColorPickerComponent({ priority, isEditAble, parentCallback }) {
  const [background, setBackground] = useState('#F47373');
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
    parentCallback("note_color", color.hex);
  };
  return (
    <CirclePicker
      color={background}
      onChangeComplete={handleChangeComplete}
    />
  );

}

export default ColorPickerComponent;
