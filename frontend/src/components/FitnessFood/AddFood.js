import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [food, setFood] = useState({
    name: '',
    baseAmount: 0,
    energy: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    salt: 0,
    fiber: 0,
    drink: false
  });

  const navigate = useNavigate();
  const FOOD_URL = '/fitness/food/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: checked
    }));
  };

  const handleAddFood = async () => {
    try {
      await axios.post(FOOD_URL, food);
      // Perform any necessary actions after successful addition
      navigate('/food');
    } catch (error) {
      console.log(error);
      // Perform error handling if needed
    }
  };

  return (
    <div>
      <h2>Add Food:</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={food.name} onChange={handleInputChange} />

        <label>Base Amount (Calories):</label>
        <input
          type="number"
          name="baseAmount"
          value={food.baseAmount}
          onChange={handleInputChange}
        />

        <label>Energy:</label>
        <input type="number" name="energy" value={food.energy} onChange={handleInputChange} />

        <label>Fat:</label>
        <input type="number" name="fat" value={food.fat} onChange={handleInputChange} />

        <label>Carbohydrates:</label>
        <input
          type="number"
          name="carbohydrates"
          value={food.carbohydrates}
          onChange={handleInputChange}
        />

        <label>Protein:</label>
        <input type="number" name="protein" value={food.protein} onChange={handleInputChange} />

        <label>Salt:</label>
        <input type="number" name="salt" value={food.salt} onChange={handleInputChange} />

        <label>Fiber:</label>
        <input type="number" name="fiber" value={food.fiber} onChange={handleInputChange} />

        <label>Drink:</label>
        <input
          type="checkbox"
          name="drink"
          checked={food.drink}
          onChange={handleCheckboxChange}
        />

        <button type="button" onClick={handleAddFood}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFood;
