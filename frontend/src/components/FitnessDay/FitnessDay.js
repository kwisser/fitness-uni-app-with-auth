import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CaloriesPieChart from '../CaloriesPieChart';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import FoodItem from '../FitnessFood/FoodItem/FoodItem';
import ExerciseItem from '../FitnessExercises/ExerciseItem';
import ItemSelector from '../ItemSelector/ItemSelector';
import { fetchActivityForDay, updateFitnessDayForProfile, insertFitnessDayForProfile } from '../../api/fitnessDayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { getCurrentDate } from '../../utils/DateHelper';
import { calculateBurnedExtraCaloriesTroughExercises, calculateProtein, calculateReachedCalories, calculateReachedProtein } from './utils/nutritionCalculations';
import { createFitnessDayJSON, extractExerciseData, extractFoodIdAndAmount } from './utils/FitnessDayHelper';


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
  const [dailyActivityData, setDailyActivityData] = useState({ food: null, exercise: null });
  const [renderedActivityData, setRenderedActivityData] = useState({ food: [], exercise: [] });
  const availableExercises = useSelector(state => state.availableExercises);
  const availableFood = useSelector(state => state.availableFood);
  const [newExercise, setNewExercise] = useState('');
  const [newFood, setNewFood] = useState('');
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [showFoodOptions, setShowFoodOptions] = useState(false);
  const [caloriesNeeded, setCaloriesNeeded] = useState(0);
  const [caloriesReached, setCaloriesReached] = useState(0);
  const [proteinReached, setProteinReached] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());

    fetchActivityForDay(profile._id, getCurrentDate()).then(data => {
      setDailyActivityData(data);
    }).catch(error => {
      console.log("Error fetching dailyActivityData:", error);
    });

  }, [dispatch, profile._id]);


  useEffect(() => {
    if (dailyActivityData?.exercise && dailyActivityData?.food) {
      setCaloriesNeeded(calculateBurnedExtraCaloriesTroughExercises({ ...profile }, dailyActivityData, availableExercises));
      setCaloriesReached(calculateReachedCalories(dailyActivityData, availableFood));
      setProteinReached(calculateReachedProtein(dailyActivityData, availableFood));
    }
  }, [dailyActivityData, profile, availableExercises, availableFood]);


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
      if (dailyActivityData.exercise.find(exercise => exercise.exerciseId === newExercise._id)) {
        alert("Diese Übung wurde bereits hinzugefügt!");
        return;
      }
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
      // Check if the food already exists in the dailyActivityData
      if (dailyActivityData.food.find(food => food.foodId === newFood._id)) {
        alert("Dieses Lebensmittel wurde bereits hinzugefügt!");
        return;
      }
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
    if (await updateFitnessDayForProfile(dailyActivityData)) {
      console.log("Updated dailyActivityData:", dailyActivityData);
    }
    else {
      console.log("Error updating dailyActivityData:", dailyActivityData);
      setDailyActivityData({ food: [], exercise: [] });
    }
  }

  const handleDeleteEatenFood = async (foodId) => {
    // Delete the food with the passed ID
    console.log("handleDeleteEatenFood: ", foodId);

    const updatedDailyActivityData = {
      ...dailyActivityData,
      food: dailyActivityData.food.filter(food => food._id !== foodId),
    };

    setDailyActivityData(updatedDailyActivityData);

    if (await updateFitnessDayForProfile(updatedDailyActivityData)) {
      console.log("Updated dailyActivityData:", updatedDailyActivityData);
    }
    else {
      console.log("Error updating dailyActivityData:", updatedDailyActivityData);
      setDailyActivityData({ food: [], exercise: [] });
    }
  }




  useEffect(() => {
    const newDailyActivityData = JSON.parse(JSON.stringify(dailyActivityData));

    if (dailyActivityData.food && availableFood) {
      newDailyActivityData.food = newDailyActivityData.food
        .map(foodItem => availableFood.find(food => food._id === foodItem.foodId))
        .filter(Boolean);  // This will remove any undefined elements
    }

    if (dailyActivityData.exercise && availableExercises) {
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

          {dailyActivityData.food && dailyActivityData.exercise && (
            <>
              <ItemSelector
                items={availableFood.filter(food => !dailyActivityData.food.find(f => f.foodId === food._id))}
                label='Essen auswählen'
                newItem={newFood}
                setNewItem={setNewFood}
                onSubmit={handleFoodSubmit}
                onAddItem={handleAddFood}
                showOptions={showFoodOptions}
              />

              <ItemSelector
                items={availableExercises.filter(exercise => !dailyActivityData.exercise.find(e => e.exerciseId === exercise._id))}
                label='Übung auswählen'
                newItem={newExercise}
                setNewItem={setNewExercise}
                onSubmit={handleExerciseSubmit}
                onAddItem={handleAddExercise}
                showOptions={showExerciseOptions}
              />
            </>
          )}


          <Typography variant="subtitle1">Essen:</Typography>
          {renderedActivityData.food && renderedActivityData.food.map((food) => (
            <FoodItem key={food._id} food={food} onDelete={handleDeleteEatenFood} />
          ))}

          <Typography variant="subtitle1">Übungen:</Typography>
          {renderedActivityData.exercise && renderedActivityData.exercise.map((exercise) => (
            <ExerciseItem key={exercise._id} exercise={exercise} onDelete={handleDeleteExercise} />
          ))}
        </div>
      </Grid>
    </Grid>

  );
};

export default ProfileDay;
