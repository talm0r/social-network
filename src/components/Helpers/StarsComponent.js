import ReactStars from "react-rating-stars-component";
import React from "react";
function StarsComponent({ priority, isEditAble , parentCallback}) {
const ratingChanged = (newRating) => {
  parentCallback('note_priority',newRating)
  };
  return (
      <div className="flex flex-center">
    <ReactStars
      count={5}
      value={priority}
      size={24}
      onChange={ratingChanged}
      edit={isEditAble}
      activeColor="#ffd700"
    />
    </div>
  );
}

export default StarsComponent