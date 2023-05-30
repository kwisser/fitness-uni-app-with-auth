import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBullseye, faFire, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';

const FoodItem = ({ food }) => {
  return (
    <div className="food-item">
      <h3>{food.name}</h3>
      <p className="food-id"><strong>Food Id:</strong> {food._id}</p>
      <div className="food-info">
        <div className="food-info-item">
          <FontAwesomeIcon icon={faUtensils} className="icon" />
          <p>{food.category}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>{food.calories} Calories</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faDumbbell} className="icon" />
          <p>{food.protein} Protein</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faBullseye} className="icon" />
          <p>{food.carbohydrates} Carbs</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>{food.fat} Fat</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
