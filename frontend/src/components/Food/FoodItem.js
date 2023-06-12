import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDumbbell, faBullseye, faUtensils, faTint, faLeaf, faMugHot, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';

const FoodItem = ({ food, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/food/edit/${food._id}`);
  };

  const handleDelete = async () => {
    onDelete(food._id);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {food.name}
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faFire} className="fire-icon" /> Base Amount:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.baseAmount} Calories
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faDumbbell} className="dumbbell-icon" /> Protein:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.protein}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faBullseye} className="bullseye-icon" /> Carbs:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.carbohydrates}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faUtensils} className="utensils-icon" /> Fat:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.fat}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faTint} className="tint-icon" /> Energy:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.energy}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faLeaf} className="leaf-icon" /> Salt:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.salt}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faMugHot} className="mughot-icon" /> Fiber:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.fiber}
          </Box>
        </Typography>
        <Typography variant="body2">
          <FontAwesomeIcon icon={faMugHot} className="mughot-icon" /> Drink:
          <Box component="span" sx={{ marginLeft: '0.5rem' }}>
            {food.drink ? 'Yes' : 'No'}
          </Box>
        </Typography>
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
