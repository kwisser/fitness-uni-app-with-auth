import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import FoodItem from './FoodItem';

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
    <div>
      <h2>Food Data:</h2>
      <ul>
      {foodData.map((food) => (
        <li key={food._id}><FoodItem food={food} /></li>
      ))}
      </ul>
      
    </div>
  );
};

export default ListFood;
