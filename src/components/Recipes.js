import React from "react";

const Recipes = ({ label, calories, image }) => {
  return (
    <div className="each-recipe">
      <h2>{label}</h2>
      <p>{calories}</p>
      <img src={image} alt={label} />
    </div>
  );
};

export default Recipes;
