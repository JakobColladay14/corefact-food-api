import React from "react";
import './Recipe.sass'
import PropTypes from 'prop-types'

const Recipe = ({ label, calories, image }) => {

  return (
    <article className="each-recipe">
      <img src={image} alt={label} />
      <div className="recipe-title">
        <h4>{label}</h4>
      </div>
      <div className="recipe-info">
        <p>Calories: {parseInt(calories)}</p>
      </div>
    </article>
  );
};

Recipe.propTypes = {
  label: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}



export default Recipe;
