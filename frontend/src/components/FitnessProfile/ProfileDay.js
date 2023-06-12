import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import FoodItem from '../Food/FoodItem';
import ExerciseItem from '../FitnessExercises/ExerciseItem';
import fetchActivityForDay from '../../api/fitnessDayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { getCurrentDate, calculateCalories, calculateProtein } from '../../tools/tools';

const ProfileDay = () => {
  const profile = useSelector(state => state.profile);
  const [dailyActivityData, setDailyActivityData] = useState({ food: [], exercise: [] });
  const [renderedActivityData, setRenderedActivityData] = useState({ food: [], exercise: [] });
  const availableExercises = useSelector(state => state.availableExercises);
  const availableFood = useSelector(state => state.availableFood);
  const [newExercise, setNewExercise] = useState('');
  const [newFood, setNewFood] = useState('');
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [showFoodOptions, setShowFoodOptions] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());
  }, [dispatch]);

  const handleAddExercise = () => {
    setShowExerciseOptions(true);
    setShowFoodOptions(false); // Hide food options
    setNewExercise('');
  };

  const handleAddFood = () => {
    setShowExerciseOptions(false); // Hide exercise options
    setShowFoodOptions(true);
    console.log("new Food: " + newFood);
    setNewFood('');
  };

  const handleExerciseSubmit = () => {
    // Speichern der ausgewählten Übung
    if (newExercise) {
      // Führen Sie hier den entsprechenden Speichervorgang durch
      console.log("Selected Exercise:", newExercise);
    }
  };

  const handleFoodSubmit = () => {
    // Speichern des ausgewählten Lebensmittels
    if (newFood) {
      // Führen Sie hier den entsprechenden Speichervorgang durch
      console.log("Selected Food:", newFood);
    }
  };

  useEffect(() => {
    fetchActivityForDay(profile._id, getCurrentDate()).then(data => {
      if (data) {
        setDailyActivityData(data);
      }
    });
  }, [profile._id, availableExercises, availableFood]);

  useEffect(() => {
    const newDailyActivityData = JSON.parse(JSON.stringify(dailyActivityData));

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
  }, [availableExercises, availableFood, dailyActivityData]);

  const caloriesNeeded = calculateCalories({ ...profile, activityData: dailyActivityData });
  const proteinNeeded = calculateProtein(profile);

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>Guten Tag, {profile.name}!</Typography>
      <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
      <Typography variant="body1" style={{ marginBottom: '2rem' }}>Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</Typography>
      <Typography variant="h6">Heutige Aktivitäten:</Typography>

      {showExerciseOptions ? (
        <div style={{ marginBottom: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel id="exercise-label">Übung auswählen</InputLabel>
            <Select
              labelId="exercise-label"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
            >
              {availableExercises.map(exercise => (
                <MenuItem key={exercise._id} value={exercise}>
                  {exercise.name} - Dauer: {exercise.baseTime} Minuten, Kalorien: {exercise.energyBurned}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleExerciseSubmit}>Speichern</Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddExercise}>Übung hinzufügen</Button>
      )}

      {showFoodOptions ? (
        <div>
          <FormControl fullWidth>
            <InputLabel id="food-label">Essen auswählen</InputLabel>
            <Select
              labelId="food-label"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
            >
              {availableFood.map(food => (
                <MenuItem key={food._id} value={food}>
                  {food.name} - Kalorien: {food.energy}, Protein: {food.protein}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFoodSubmit}>Speichern</Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddFood}>Essen hinzufügen</Button>
      )}

      <Typography variant="subtitle1">Essen:</Typography>
      {renderedActivityData.food.map((food, index) => (
        <FoodItem key={food._id} food={food} />
      ))}

      <Typography variant="subtitle1">Übungen:</Typography>
      {renderedActivityData.exercise.map((exercise, index) => (
        <ExerciseItem key={exercise._id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ProfileDay;
