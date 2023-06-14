import React from 'react';
import ExerciseList from '../components/FitnessExercises/ListExercises';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Exercises = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Exercises
                </Typography>
                <ExerciseList />
            </Box>
        </Container>
    );
};

export default Exercises;
