import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faFire, faDumbbell, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './FoodItem.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ food }) => {
  const DELETE_FOOD_ITEM_URL = '/fitness/food/';
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/food/edit/${food._id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${DELETE_FOOD_ITEM_URL}${food._id}`);
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
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Base Amount: {food.baseAmount} Calories</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faDumbbell} className="icon" />
          <p>Protein: {food.protein}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faBullseye} className="icon" />
          <p>Carbs: {food.carbohydrates}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Fat: {food.fat}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Energy: {food.energy}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Salt: {food.salt}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Fiber: {food.fiber}</p>
        </div>
        <div className="food-info-item">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>Drink: {food.drink ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <button className="edit-button" onClick={handleEdit}>
        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
        Edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className="delete-icon" />
        Delete
      </button>
    </div>
  );
};

export default FoodItem;
