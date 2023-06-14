import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import {useNavigate} from 'react-router-dom';

const FoodEdit = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('/fitness/food/');
        const foundFood = response.data.find(item => item._id === id);
        if (foundFood) {
          setFood(foundFood);
        } else {
          console.log(`Food item with id ${id} not found.`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/fitness/food/', {
        foodId: food._id,
        name: food.name,
        baseAmount: food.baseAmount,
        energy: food.energy,
        fat: food.fat,
        carbohydrates: food.carbohydrates,
        protein: food.protein,
        salt: food.salt,
        fiber: food.fiber,
        drink: food.drink
      });
  
      if (response.status === 201) {
        console.log("Successfully updated food item");
        navigate('/food');
      } else {
        console.log("Failed to update food item");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  if (!food) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={food.name} onChange={handleChange} />
      </label>
      <label>
        Base Amount:
        <input type="number" name="baseAmount" value={food.baseAmount} onChange={handleChange} />
      </label>
      <label>
        Protein:
        <input type="number" name="protein" value={food.protein} onChange={handleChange} />
      </label>
      <label>
        Carbs:
        <input type="number" name="carbohydrates" value={food.carbohydrates} onChange={handleChange} />
      </label>
      <label>
        Fat:
        <input type="number" name="fat" value={food.fat} onChange={handleChange} />
      </label>
      <label>
        Energy:
        <input type="number" name="energy" value={food.energy} onChange={handleChange} />
      </label>
      <label>
        Salt:
        <input type="number" name="salt" value={food.salt} onChange={handleChange} />
      </label>
      <label>
        Fiber:
        <input type="number" name="fiber" value={food.fiber} onChange={handleChange} />
      </label>
      <label>
        Drink:
        <select name="drink" value={food.drink} onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FoodEdit;
