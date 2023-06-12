import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FoodItem from '../FoodItem';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import fetchAvailableFitnessFood from '../../../api/fitnessFoodApi';
import './ListFood.css';

const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
});

const ListFood = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchAvailableFitnessFood().then((data) => {
      setFoodData(data);
    }
    );
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
            <FoodItem food={food} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListFood;
