import React from 'react';
import { Container, Box } from '@mui/material';
import ListFood from '../components/FitnessFood/FoodList/ListFood';

const Food = () => {
  return (
    <Container>
      <Box my={4}>
        <ListFood />
      </Box>
    </Container>
  );
}

export default Food;
