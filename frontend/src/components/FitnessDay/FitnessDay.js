import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CaloriesPieChart from '../CaloriesPieChart';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import FitnessActivityItemSelector from './FitnessDayActivities/FitnessActivityItemSelector/FitnessActivityItemSelector';
import FitnessDayActivities from './FitnessDayActivities/FitnessDayActivities';

import { fetchActivityForDayForProfileId, updateFitnessDayForProfile, insertFitnessDayForProfile } from '../../api/fitnessDayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
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


const FitnessDay = ({ userId, date }) => {
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
  const [caloriesNeeded, setCaloriesNeeded] = useState(0);
  const [caloriesReached, setCaloriesReached] = useState(0);
  const [proteinReached, setProteinReached] = useState(0);
  const [dailyActivityDataExisting, setDailyActivityDataExisting] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());

    fetchActivityForDayForProfileId(userId, date).then(data => {
      if (data && Object.keys(data).length > 0) {
        setDailyActivityData(data);
        setDailyActivityDataExisting(true);
      } else {
        setDailyActivityData({ food: [], exercise: [] });
        setDailyActivityDataExisting(false);
      }
      console.log("Fetched dailyActivityData:", data);
    }).catch(error => {
      console.log("Error fetching dailyActivityData:", error);
    });

  }, [dispatch, userId, date]);


  useEffect(() => {
    if (dailyActivityData?.exercise && dailyActivityData?.food) {
      console.log("in use effect for setting calories/protein")
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
    // Save selected exercise
    if (!newExercise || !exerciseDuration) return;

    const newExerciseData = extractExerciseData(newExercise, exerciseDuration);

    console.log("newExerciseData: ", newExerciseData);

    if (dailyActivityData?.exercise?.find(exercise => exercise.exerciseId === newExerciseData._id)) {
      alert("This exercise has already been added!");
      return;
    }

    console.log("dailyActivityData: ", dailyActivityData);

    const newDailyActivityData = {
      ...dailyActivityData,
      exercise: [...(dailyActivityData?.exercise || []), newExerciseData],
    };

    console.log("Selected Exercise: ", newExerciseData);

    setDailyActivityData(newDailyActivityData);

    try {
      const operationSuccess = dailyActivityDataExisting
        ? await updateFitnessDayForProfile(newDailyActivityData)
        : await insertFitnessDayForProfile(createFitnessDayJSON(newDailyActivityData), false, profile._id, date);

      if (operationSuccess) {
        console.log(`${dailyActivityDataExisting ? "Updated" : "Inserted"} dailyActivityData: `, newDailyActivityData);
      } else {
        throw new Error(`${dailyActivityDataExisting ? "Updating" : "Inserting"} dailyActivityData failed`);
      }
    } catch (error) {
      console.log(`Error ${dailyActivityDataExisting ? "updating" : "inserting"} dailyActivityData: `, newDailyActivityData);
      setDailyActivityData({ food: [], exercise: [] });
    }
    setShowExerciseOptions(false);
    setExerciseDuration('');
  };



  const handleFoodSubmit = async () => {
    // Saving selected food item
    if (!newFood || !foodQuantity) return;

    // Extracting food data should now also include the quantity
    const newFoodData = extractFoodIdAndAmount(newFood);
    newFoodData.amount = foodQuantity;

    const updatedFoodList = [...(dailyActivityData?.food || []), newFoodData];
    console.log("Updated food list: ", updatedFoodList);
    const updatedDailyActivityData = { ...dailyActivityData, food: updatedFoodList };

    setDailyActivityData(updatedDailyActivityData);

    try {
      if (dailyActivityDataExisting) {
        console.log("Existing daily activity data: ", dailyActivityDataExisting);
        const updateResult = await updateFitnessDayForProfile(updatedDailyActivityData);
        console.log("Updated dailyActivityData: ", updatedDailyActivityData);
        return updateResult;
      } else {
        const insertResult = await insertFitnessDayForProfile(createFitnessDayJSON(newFood, true, profile._id, date));
        console.log("Inserted dailyActivityData: ", updatedDailyActivityData);
        return insertResult;
      }
    } catch (error) {
      console.error("Error updating or inserting dailyActivityData: ", error);
      setDailyActivityData({ food: [], exercise: [] });
    } finally {
      setShowFoodOptions(false);
      setFoodQuantity('');
    }
  };

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
                <CaloriesPieChart key={caloriesReached} consumed={caloriesReached} total={caloriesNeeded} />
              </div>
            </Box>
            <Box>
              <Typography variant="body1">Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</Typography>
              <Typography variant="body1">Protein/Eiweiß heute bisher gegessen: {proteinReached.toFixed(2)}g</Typography>
              <div style={{ width: '200px', height: '200px' }}>
                <CaloriesPieChart key={proteinReached} consumed={proteinReached} total={proteinNeeded} />
              </div>
            </Box>
          </Container>
          <Typography variant="h6">Heutige Aktivitäten:</Typography>

          <>
            <FitnessActivityItemSelector
              items={availableFood.filter(food => !dailyActivityData?.food?.find(f => f.foodId === food._id))}
              label='Essen auswählen'
              newItem={newFood}
              setNewItem={setNewFood}
              quantity={foodQuantity}  // new prop
              setQuantity={setFoodQuantity}  // new prop
              onSubmit={handleFoodSubmit}
              onAddItem={handleAddFood}
              showOptions={showFoodOptions}
            />

            <FitnessActivityItemSelector
              items={availableExercises.filter(exercise => !dailyActivityData?.exercise?.find(e => e.exerciseId === exercise._id))}
              label='Übung auswählen'
              newItem={newExercise}
              setNewItem={setNewExercise}
              quantity={exerciseDuration}  // new prop
              setQuantity={setExerciseDuration}  // new prop
              onSubmit={handleExerciseSubmit}
              onAddItem={handleAddExercise}
              showOptions={showExerciseOptions}
            />
          </>

          <FitnessDayActivities dailyActivityData={dailyActivityData} setDailyActivityData={setDailyActivityData} />

        </div>
      </Grid>
    </Grid>

  );
};

export default FitnessDay;
