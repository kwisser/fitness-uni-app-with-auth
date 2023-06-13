import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Grid } from '@mui/material';

import FoodItem from '../FitnessFood/FoodItem/FoodItem';
import ExerciseItem from '../FitnessExercises/ExerciseItem';
import { fetchActivityForDay, updateFitnessDayForProfile, insertFitnessDayForProfile } from '../../api/fitnessDayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { getCurrentDate, calculateCalories, calculateProtein, calculateReachedCalories, calculateReachedProtein } from '../../tools/tools';
import { createFitnessDayJSON } from '../../tools/fitnessDayHelper';
import CaloriesPieChart from '../CaloriesPieChart';
import { useTheme } from '@mui/material/styles';

import styled from '@emotion/styled';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction: row;
  }
`;

const Box = styled('div')`
  margin-bottom: 2rem;
`;


const ProfileDay = () => {
  const theme = useTheme();
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
    console.log("extractExerciseData: ", exercise);
    console.log({
      exerciseId: exercise._id,
      timeInMinutes: exercise.baseTime
    });
    return {
      exerciseId: exercise._id,
      timeInMinutes: exercise.baseTime
    };
  };

  const extractFoodIdAndAmount = (object) => {
    const { _id: foodId, baseAmount: amount } = object;
    console.log("extractFoodIdAndAmount: ", { foodId, amount });
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

  const handleExerciseSubmit = async () => {
    // Speichern der ausgewählten Übung
    if (newExercise) {
      // Führen Sie hier den entsprechenden Speichervorgang durch
      console.log("Selected Exercise:", newExercise);

      setDailyActivityData(prevState => ({
        ...prevState,
        exercise: [...prevState.exercise, extractExerciseData(newExercise)],
      }));

      if (dailyActivityData.exercise.length > 0) {

        if (await updateFitnessDayForProfile(dailyActivityData)) {
          console.log("Updated dailyActivityData:", dailyActivityData);
        }
        else {
          console.log("Error updating dailyActivityData:", dailyActivityData);
          setDailyActivityData({ food: [], exercise: [] });
        }
        setShowExerciseOptions(false);
      }
      else {
        if (await insertFitnessDayForProfile(createFitnessDayJSON(newExercise, false, profile._id, getCurrentDate()))) {
          console.log("Inserted dailyActivityData:", dailyActivityData);
        }
        else {
          console.log("Error inserting dailyActivityData:", dailyActivityData);
          setDailyActivityData({ food: [], exercise: [] });
        }
        setShowExerciseOptions(false);
      }
    }
  };

  const handleFoodSubmit = async () => {
    // Speichern des ausgewählten Lebensmittels
    if (newFood) {
      // Führen Sie hier den entsprechenden Speichervorgang durch
      console.log("Selected Food:", newFood);

      setDailyActivityData(prevState => ({
        ...prevState,
        food: [...prevState.food, extractFoodIdAndAmount(newFood)],
      }));

      if (dailyActivityData.food.length > 0) {
        if (await updateFitnessDayForProfile(dailyActivityData)) {
          console.log("Updated dailyActivityData:", dailyActivityData);
        }
        else {
          console.log("Error updating dailyActivityData:", dailyActivityData);
          return false
        }
      }

      else {
        if (await insertFitnessDayForProfile(createFitnessDayJSON(newFood, true, profile._id, getCurrentDate()))) {
          console.log("Inserted dailyActivityData:", dailyActivityData);
        }
        else {
          console.log("Error inserting dailyActivityData:", dailyActivityData);
          setDailyActivityData({ food: [], exercise: [] });
          return false
        }
        setShowFoodOptions(false);
      }
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    // Löschen Sie die Übung mit der übergebenen ID
    console.log("handleDeleteExercise: ", exerciseId);
    setDailyActivityData(prevState => ({
      ...prevState,
      exercise: prevState.exercise.filter(exercise => exercise.exerciseId !== exerciseId),
    }));
    if (updateFitnessDayForProfile(dailyActivityData)) {
      console.log("Updated dailyActivityData:", dailyActivityData);
    }
    else {
      console.log("Error updating dailyActivityData:", dailyActivityData);
      setDailyActivityData({ food: [], exercise: [] });
    }
  }

  const handleDeleteEatenFood = (foodId) => {
    // Löschen Sie die Übung mit der übergebenen ID
    console.log("handleDeleteExercise: ", foodId);
    setDailyActivityData(prevState => ({
      ...prevState,
      food: prevState.exercise.filter(food => food._id !== foodId),
    }));
    updateFitnessDayForProfile(dailyActivityData);
    console.log("Updated dailyActivityData:", dailyActivityData);
  }

  useEffect(() => {
    fetchActivityForDay(profile._id, getCurrentDate()).then(data => {
      if (data) {
        console.log("Daily Acitivity Data vorhanden: " + data);
        setDailyActivityData(data);
      }
      else {
        console.log("Daily Acitivity Data nicht vorhanden");
        setDailyActivityData({ food: [], exercise: [] });
        console.log(dailyActivityData);
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
          <Container theme={theme}>
            <Box>
              <Typography variant="body1">Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
              <Typography variant="body1">Bisher gegessene {caloriesReached} Kalorien.</Typography>
              <div style={{ width: '200px', height: '200px' }}>
                <CaloriesPieChart consumed={caloriesReached} total={caloriesNeeded} />
              </div>
            </Box>
            <Box>
              <Typography variant="body1">Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</Typography>
              <Typography variant="body1">Protein/Eiweiß heute bisher gegessen: {proteinReached.toFixed(2)}g</Typography>
              <div style={{ width: '200px', height: '200px' }}>
                <CaloriesPieChart consumed={proteinReached} total={proteinNeeded} />
              </div>
            </Box>
          </Container>
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
            <FoodItem key={index} food={food} onDelete={handleDeleteEatenFood} />
          ))}

          <Typography variant="subtitle1">Übungen:</Typography>
          {renderedActivityData.exercise.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} onDelete={handleDeleteExercise} />
          ))}
        </div>
      </Grid>
    </Grid>

  );
};

export default ProfileDay;
