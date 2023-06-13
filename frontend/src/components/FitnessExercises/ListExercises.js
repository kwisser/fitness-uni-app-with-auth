import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ExerciseItem from './ExerciseItem';
import fetchAviableFitnessExercises from '../../api/fitnessExercisesApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
});

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchAviableFitnessExercises().then((data) => {
      setExercises(data);
    });
  }, []);

  const handleDelete = (id) => {
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  const handleEdit = (id, updatedExercise) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise._id === id ? updatedExercise : exercise
    );
    setExercises(updatedExercises);
  };

  return (
    <Container>
      <Card sx={{ my: 3 }}>
        <CardContent>
          <Typography variant="h5">Exercise List:</Typography>
          <StyledRouterLink to="/exercises/add">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Exercise
            </Button>
          </StyledRouterLink>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        {exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise._id}>
            <ExerciseItem
              exercise={exercise}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExerciseList;
