import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../api/axios';
import FoodItem from '../FoodItem';
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
          <Card sx={{ my: 3 }}>
        <CardContent>
          <Typography variant="h5">Food List:</Typography>
          <Link to="/food/add">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Food
            </Button>
          </Link>
        </CardContent>
      </Card>
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
