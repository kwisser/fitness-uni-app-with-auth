import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Grid, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FoodItem from '../FoodItem/FoodItem';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchAvailableFitnessFood, deleteFoodItem } from '../../../api/fitness/foodApi';
import './ListFood.css';

const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
});

const ListFood = () => {
  const [foodData, setFoodData] = useState([]);
  const [onlyDrinks, setOnlyDrinks] = useState(false);
  const [onlyFood, setOnlyFood] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onlyDrinks) {
      fetchAvailableFitnessFood("drinks").then((data) => {
        setFoodData(data);
      });
    } else if (onlyFood) {
      fetchAvailableFitnessFood("food").then((data) => {
        setFoodData(data);
      });
    } else {
      fetchAvailableFitnessFood("").then((data) => {
        setFoodData(data);
      });
    }
  }, [onlyDrinks, onlyFood]);

  const handleDelete = async (id) => {
    await deleteFoodItem(id);
    setFoodData(foodData.filter((food) => food._id !== id));
  };

  const handleEdit = async (food_id) => {
    navigate(`/food/edit/${food_id}`);
  };


  return (
    <Container>
      <Card sx={{ my: 3 }}>
        <CardContent>
          <Typography variant="h5">Food List:</Typography>
          <FormControlLabel
            control={
              <Checkbox checked={onlyDrinks} onChange={(e) => {
                setOnlyDrinks(e.target.checked);
                setOnlyFood(false);
              }} />
            }
            label="Only Drinks"
          />
          <FormControlLabel
            control={
              <Checkbox checked={onlyFood} onChange={(e) => {
                setOnlyFood(e.target.checked);
                setOnlyDrinks(false);
              }} />
            }
            label="Only Food"
          />
          <StyledRouterLink to="/food/add">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Food
            </Button>
          </StyledRouterLink>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        {foodData.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food._id}>
            <FoodItem food={food} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListFood;