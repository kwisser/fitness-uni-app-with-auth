import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import FoodItem from '../FoodItem';
import { Link } from 'react-router-dom';
import './ListFood.css';

const ListFood = () => {
  const [foodData, setFoodData] = useState([]);

  const FOOD_URL = '/fitness/food/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FOOD_URL, {});
        setFoodData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="list-food-container">
      <div className="food-header">
        <h2>Food Data:</h2>
        <div className="add-food-link">
          <Link to="/food/add">Add Food</Link>
        </div>
      </div>
      <ul className="food-list">
        {foodData.map((food) => (
          <li key={food._id}>
            <FoodItem food={food} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFood;
