import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FoodItem from '../Food/FoodItem';
import ExerciseItem from '../Exercises/ExerciseItem';
import fetchActivityForDay from '../../api/fitnessDayApi';
import { fetchAvailableExercises} from '../../actions/availableExercisesActions';
import { fetchAvailableFood} from '../../actions/availableFoodActions';
import { Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const ProfileDay = () => {
  const profile = useSelector(state => state.profile);
  const [dailyActitivyData, setDailyActivityData] = useState({ food: [], exercise: [] });
  const [renderedActivityData, setRenderedActivityData] = useState({ food: [], exercise: [] });
  const availableExercises = useSelector(state => state.availableExercises);
  const availableFood = useSelector(state => state.availableFood);
  const [newExercise, setNewExercise] = useState('');
  const [newFood, setNewFood] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());

  }, [dispatch]);

  const handleAddExercise = () => {
    // Implement this function to add new exercise
    setNewExercise('');
  };

  const handleAddFood = () => {
    // Implement this function to add new food
    setNewFood('');
  };

  const getCurrentDate = () => {
    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  };

  useEffect(() => {
    fetchActivityForDay(profile._id, getCurrentDate()).then(data => {
      if (data) {
        setDailyActivityData(data);
      }
    }
    );
  }, [profile._id, availableExercises, availableFood]);

  useEffect(() => {
    const newDailyActivityData = JSON.parse(JSON.stringify(dailyActitivyData));

    if (newDailyActivityData.food.length > 0 && availableFood) {
      newDailyActivityData.food = newDailyActivityData.food
        .map(foodItem => availableFood.find(food => food._id === foodItem.foodId))
        .filter(Boolean);  // This will remove any undefined elements
    }

    if (newDailyActivityData.exercise.length > 0 && availableExercises) {
      newDailyActivityData.exercise = newDailyActivityData.exercise
        .map(exerciseItem => availableExercises.find(exercise => exercise._id === exerciseItem.exerciseId))
        .filter(Boolean);  // This will remove any undefined elements
    }

    setRenderedActivityData(newDailyActivityData);
  }, [availableExercises, availableFood, dailyActitivyData]);

  const calculateCalories = (profile) => {
    const { weight, height, age, gender } = profile;
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  const calculateProtein = (profile) => {
    const proteinPerKg = 0.793664791;
    return proteinPerKg * profile.weight;
  };

  const caloriesNeeded = calculateCalories(profile);
  const proteinNeeded = calculateProtein(profile);

  return (
    <div>
      <Typography variant="h2">Guten Tag, {profile.name}!</Typography>
      <Typography>Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
      <Typography>Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</Typography>
      <Typography variant="h3">Heutige Aktivitäten:</Typography>
      <Typography variant="h4">Essen:</Typography>
      
      {renderedActivityData.food.map((food, index) => (
        <FoodItem key={food._id} food={food} />
      ))}
      {renderedActivityData.exercise.map((exercise, index) => (
        <ExerciseItem key={exercise._id} exercise={exercise} />
      ))}

      <div>
        <FormControl fullWidth>
          <InputLabel id="exercise-label">Übung auswählen</InputLabel>
          <Select 
            labelId="exercise-label"
            value={newExercise} 
            onChange={(e) => setNewExercise(e.target.value)}
          >
            {availableExercises.map(exercise => (
              <MenuItem key={exercise._id} value={exercise.id}>
                {exercise.name} - Dauer: {exercise.duration} Minuten, Kalorien: {exercise.calories}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddExercise}>Übung hinzufügen</Button>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="food-label">Essen auswählen</InputLabel>
          <Select 
            labelId="food-label"
            value={newFood} 
            onChange={(e) => setNewFood(e.target.value)}
          >
            {availableFood.map(food => (
              <MenuItem key={food._id} value={food.id}>
                {food.name} - Kalorien: {food.energy}, Protein: {food.protein} 
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddFood}>Essen hinzufügen</Button>
      </div>
    </div>
  );
};

export default ProfileDay;
