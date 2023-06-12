import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../api/axios';
import FoodItem from '../FoodItem';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import './ListFood.css';

const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
});

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
    <Container>
          <Card sx={{ my: 3 }}>
        <CardContent>
          <Typography variant="h5">Food List:</Typography>
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
            <FoodItem food={food}  />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListFood;
