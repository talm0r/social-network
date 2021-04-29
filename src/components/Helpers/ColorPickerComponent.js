import React from 'react';
import {BlockPicker, ChromePicker, CirclePicker, SketchPicker} from 'react-color';
import { useState } from "react";

// class Component extends React.Component {
//   state = {
//     background: '#fff',
//   };

//   handleChangeComplete = (color) => {
//     this.setState({ background: color.hex });
//   };

//   render() {
//     return (
//       <SketchPicker
//         color={ this.state.background }
//         onChangeComplete={ this.handleChangeComplete }
//       />
//     );
//   }
// }
function ColorPickerComponent({ priority, isEditAble, parentCallback }) {

    const [background,setBackground] = useState('#F47373');
  
    
   const   handleChangeComplete = (color) => {
      //  console.log(color);
         setBackground(color.hex);
        parentCallback("note_color",color.hex);
      };

      return (
        
        <CirclePicker
            color={background }
          onChangeComplete={ handleChangeComplete }
        />

      );
    
      }
    
    export default ColorPickerComponent
