import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Grid } from '@mui/material';

import FoodItem from '../Food/FoodItem';
import ExerciseItem from '../FitnessExercises/ExerciseItem';
import { fetchActivityForDay, updateFitnessDayForProfile } from '../../api/fitnessDayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { getCurrentDate, calculateCalories, calculateProtein, calculateReachedCalories, calculateReachedProtein } from '../../tools/tools';
import CaloriesPieChart from '../CaloriesPieChart';

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
  const [caloriesNeeded, setCaloriesNeeded] = useState(calculateCalories({ ...profile }, dailyActivityData, availableExercises));
  const [caloriesReached, setCaloriesReached] = useState(calculateCalories({ ...profile }, dailyActivityData, availableFood));
  const [proteinReached, setProteinReached] = useState(calculateReachedProtein(dailyActivityData, availableFood));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());
  }, [dispatch, setDailyActivityData]);


  useEffect(() => {
    console.log("Updated dailyActivityData:", dailyActivityData);
    setCaloriesNeeded(calculateCalories({ ...profile }, dailyActivityData, availableExercises));
    setCaloriesReached(calculateReachedCalories(dailyActivityData, availableFood));
    setProteinReached(calculateReachedProtein(dailyActivityData, availableFood));
  }, [dailyActivityData, profile, availableExercises]);

  const extractExerciseData = (exercise) => {
    return {
      _id: exercise._id,
      exerciseId: exercise._id,
      timeInMinutes: exercise.baseTime
    };
  };

  const extractFoodIdAndAmount = (object) => {
    const { _id: foodId, baseAmount: amount } = object;
    return { foodId, amount };
  };

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

      setDailyActivityData(prevState => ({
        ...prevState,
        exercise: [...prevState.exercise, extractExerciseData(newExercise)],
      }));
      console.log("Updated dailyActivityData:", dailyActivityData);
      updateFitnessDayForProfile(dailyActivityData);
      setShowExerciseOptions(false);
      console.log("Updated dailyActivityData:", dailyActivityData);
    }
  };

  const handleFoodSubmit = () => {
    // Speichern des ausgewählten Lebensmittels
    if (newFood) {
      // Führen Sie hier den entsprechenden Speichervorgang durch
      console.log("Selected Food:", newFood);

      setDailyActivityData(prevState => ({
        ...prevState,
        food: [...prevState.food, extractFoodIdAndAmount(newFood)],
      }));
      updateFitnessDayForProfile(dailyActivityData);
      setShowFoodOptions(false);
      console.log("Updated dailyActivityData:", dailyActivityData);
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

  const proteinNeeded = calculateProtein(profile);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>Guten Tag, {profile.name}!</Typography>
          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>Bisher gegessene {caloriesReached} Kalorien.</Typography>
          <div style={{ width: '200px', height: '200px' }}>
            <CaloriesPieChart consumed={caloriesReached} total={caloriesNeeded} />
          </div>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</Typography>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>Protein/Eiweiß heute bisher gegessen: {proteinReached.toFixed(2)}g</Typography>
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
            <FoodItem key={index} food={food} />
          ))}

          <Typography variant="subtitle1">Übungen:</Typography>
          {renderedActivityData.exercise.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} />
          ))}
        </div>
      </Grid>
    </Grid>

  );
};

export default ProfileDay;
