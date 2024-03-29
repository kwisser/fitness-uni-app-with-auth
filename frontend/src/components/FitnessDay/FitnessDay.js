import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Typography } from '@mui/material';

import FitnessActivityItemSelector from './FitnessDayActivities/FitnessActivityItemSelector/FitnessActivityItemSelector';
import FitnessDayActivities from './FitnessDayActivities/FitnessDayActivities';
import NutritionSummary from './NutritionSummary/NutritionSummary';

import { fetchFitnessActivityForSpecificDayForProfile, updateFitnessDayForProfile, insertFitnessDayForProfile } from '../../api/fitness/dayApi';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { calculateBurnedExtraCaloriesTroughExercises, calculateProtein, calculateReachedCalories, calculateReachedProtein, calculateReachedCarbs, calculateReachedFat } from './utils/NutritionCalculations';
import { createFitnessDayJSON, extractExerciseData, extractFoodIdAndAmount } from './utils/FitnessDayHelper';
import { getCurrentDate } from '../../utils/DateHelper';


const FitnessDay = ({ userid, date = getCurrentDate() }) => {
  const profile = useSelector(state => state.profile);
  const [dailyActivityData, setDailyActivityData] = useState({ food: [], exercise: [] });
  const availableExercises = useSelector(state => state.availableExercises);
  const availableFood = useSelector(state => state.availableFood);
  const [newExercise, setNewExercise] = useState('');
  const [newFood, setNewFood] = useState('');
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [showFoodOptions, setShowFoodOptions] = useState(false);

  const [caloriesNeeded, setCaloriesNeeded] = useState(0);
  const [caloriesReached, setCaloriesReached] = useState(0);

  const [proteinReached, setProteinReached] = useState(0);
  const [proteinNeeded, setProteinNeeded] = useState(0);

  const [carbsNeeded, setCarbsNeeded] = useState(0);
  const [carbsReached, setCarbsReached] = useState(0);

  const [fatNeeded, setFatNeeded] = useState(0);
  const [fatReached, setFatReached] = useState(0);

  const [dailyActivityDataExisting, setDailyActivityDataExisting] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');

  const userId = userid || profile._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());

    const fetchFitnessActivityData = async () => {

      const result = await fetchFitnessActivityForSpecificDayForProfile(userId, date)

      if (result) {
        setDailyActivityData(result);
        setDailyActivityDataExisting(true);
      }
    }
    fetchFitnessActivityData();

  }, [dispatch, userId, date, setNewExercise, setNewFood]);


  useEffect(() => {
    if (dailyActivityData?.exercise && dailyActivityData?.food) {

      setCaloriesNeeded(calculateBurnedExtraCaloriesTroughExercises({ ...profile }, dailyActivityData, availableExercises));
      setCaloriesReached(calculateReachedCalories(dailyActivityData, availableFood));

      setProteinNeeded(calculateProtein(profile));
      setProteinReached(calculateReachedProtein(dailyActivityData, availableFood));

      setCarbsNeeded((caloriesNeeded / 2) / 4);
      setCarbsReached(calculateReachedCarbs(dailyActivityData, availableFood));

      setFatNeeded(caloriesNeeded * 0.03);
      setFatReached(calculateReachedFat(dailyActivityData, availableFood));

    }
  }, [dailyActivityData, profile, availableExercises, availableFood, caloriesNeeded]);


  const handleAddExercise = () => {
    setShowFoodOptions(false); // Hide food options
    setShowExerciseOptions(true);
    setNewExercise('');
  };

  const handleAddFood = () => {
    setShowExerciseOptions(false); // Hide exercise options
    setShowFoodOptions(true);
    setNewFood('');
  };

  const handleExerciseSubmit = async () => {

    // Save selected exercise
    if (!newExercise || !exerciseDuration) {
      console.error("No exercise or duration selected!")
      setExerciseDuration('');
      setShowExerciseOptions(false);
      return;
    }

    const newExerciseData = extractExerciseData(newExercise, exerciseDuration);
    newExerciseData.timeInMinutes = exerciseDuration;
    console.log("newExerciseData: ", newExerciseData);

    // Geprüft - ID namen waren richtig
    if (dailyActivityData?.exercise?.find(exercise => exercise._id === newExerciseData.exerciseId)) {
      alert("This exercise has already been added!");
      setShowExerciseOptions(false);
      setExerciseDuration('');
      return;
    }

    const updatedExerciseList = [...(dailyActivityData?.exercise || []), newExerciseData];
    const newDailyActivityData = { ...dailyActivityData, exercise: updatedExerciseList };

    try {
      if (dailyActivityDataExisting) {
        // add dayId and date to newDailyActivityData
        const dailyFetchData = await fetchFitnessActivityForSpecificDayForProfile(userId, date);
        console.log("dailyFetchData: ", dailyFetchData)
        if (dailyFetchData) {
          newDailyActivityData.dayId = dailyFetchData._id;
          newDailyActivityData.date = dailyFetchData.date;
        }

        const updateResult = await updateFitnessDayForProfile(newDailyActivityData);
        if (updateResult) {
          delete newDailyActivityData.dayId;
          delete newDailyActivityData.date;
          setDailyActivityData(newDailyActivityData);
          setDailyActivityDataExisting(true);
          setShowExerciseOptions(false);
          setExerciseDuration('');
        }
        return updateResult;
      } else {
        const insertResult = await insertFitnessDayForProfile(createFitnessDayJSON(newExerciseData, false, profile._id, date));
        if (insertResult) {
          console.log("Inserted dailyActivityData: ", newDailyActivityData);
          setDailyActivityData(newDailyActivityData);
          setDailyActivityDataExisting(true);
        }

        setShowExerciseOptions(false);
        setExerciseDuration('');
        return insertResult;
      }
    } catch (error) {
      console.log(`Error ${dailyActivityDataExisting ? "updating" : "inserting"} dailyActivityData: `, newDailyActivityData);
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

    console.log("newFoodData: ", newFoodData);

    const updatedFoodList = [...(dailyActivityData?.food || []), newFoodData];
    const updatedDailyActivityData = { ...dailyActivityData, food: updatedFoodList };


    try {
      if (dailyActivityDataExisting) {
        console.log("dailyActivityDataExisting: ", dailyActivityDataExisting)

        // add dayId and date to newDailyActivityData
        const dailyFetchData = await fetchFitnessActivityForSpecificDayForProfile(userId, date);
        console.log("dailyFetchData: ", dailyFetchData)
        if (dailyFetchData) {
          updatedDailyActivityData.dayId = dailyFetchData._id;
          updatedDailyActivityData.date = dailyFetchData.date;
        }

        console.log("updatedDailyActivityData: ", updatedDailyActivityData)
        const updateResult = await updateFitnessDayForProfile(updatedDailyActivityData);
        if (updateResult) {
          console.log("Updated dailyActivityData: ", updatedDailyActivityData);
          setDailyActivityData(updatedDailyActivityData);
          setDailyActivityDataExisting(true);

        }
        return updateResult;
      }
      else {
        const insertResult = await insertFitnessDayForProfile(createFitnessDayJSON(newFoodData, true, profile._id, date));
        if (insertResult) setDailyActivityData(updatedDailyActivityData)

        console.log("Inserted dailyActivityData: ", updatedDailyActivityData);
        setDailyActivityDataExisting(true);
        return insertResult;
      }


    } catch (error) {
      console.error("Error updating or inserting dailyActivityData: ", error);
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

  }, [availableExercises, availableFood, dailyActivityData]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>Guten Tag, {profile.name}!</Typography>
          <NutritionSummary
            caloriesNeeded={caloriesNeeded}
            caloriesReached={caloriesReached}
            proteinNeeded={proteinNeeded}
            proteinReached={proteinReached}
            fatNeeded={fatNeeded}
            fatReached={fatReached}
            carbsNeeded={carbsNeeded}
            carbsReached={carbsReached}
          />

          <Typography variant="h6">Heutige Aktivitäten:</Typography>

          <>
            <FitnessActivityItemSelector
              items={availableFood.filter(food => !dailyActivityData?.food?.find(f => f.foodId === food._id))}
              label='Essen auswählen'
              newItem={newFood}
              setNewItem={setNewFood}
              quantity={foodQuantity}
              setQuantity={setFoodQuantity}
              onSubmit={handleFoodSubmit}
              onAddItem={handleAddFood}
              showOptions={showFoodOptions}
            />

            <FitnessActivityItemSelector
              items={availableExercises.filter(exercise => !dailyActivityData?.exercise?.find(e => e.exerciseId === exercise._id))}
              label='Übung auswählen'
              newItem={newExercise}
              setNewItem={setNewExercise}
              quantity={exerciseDuration}
              setQuantity={setExerciseDuration}
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
