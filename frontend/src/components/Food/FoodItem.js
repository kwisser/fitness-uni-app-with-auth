import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faFire, faDumbbell, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';

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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {food.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Base Amount: {food.baseAmount} Calories
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faDumbbell} className="icon" />
              Protein: {food.protein}
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faBullseye} className="icon" />
              Carbs: {food.carbohydrates}
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Fat: {food.fat}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Energy: {food.energy}
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Salt: {food.salt}
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Fiber: {food.fiber}
            </Typography>
            <Typography variant="body2">
              <FontAwesomeIcon icon={faFire} className="icon" />
              Drink: {food.drink ? 'Yes' : 'No'}
            </Typography>
          </div>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          Edit
        </Button>
        <Button size="small" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodItem;
