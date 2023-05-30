import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBullseye, faFire, faDumbbell, faTrash } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ food }) => {
  const DELETE_FOOT_ITEL_URL = '/fitness/food/';
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${DELETE_FOOT_ITEL_URL}${food._id}`);
      // Reload the food list or perform any other necessary actions
      navigate('/food');
        navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

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
          <p>{food.baseAmount} Calories</p>
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
      <button className="delete-button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className="delete-icon" />
        Delete
      </button>
    </div>
  );
};

export default FoodItem;
