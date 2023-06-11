import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import fetchAvailableFitnessExercises from '../../api/fitnessExercisesApi';
import fetchAvailableFitnessFood from '../../api/fitnessFoodApi';

const ProfileDay = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [dailyActivities, setDailyActivities] = useState({food: [], exercise: []});
  const [availableExercises, setAvailableExercises] = useState([]);
  const [availableFood, setAvailableFood] = useState([]);
  const [newExercise, setNewExercise] = useState('');
  const [newFood, setNewFood] = useState('');

  const handleAddExercise = () => {
    // Implement this function to add new exercise
    setNewExercise('');
  };

  const handleAddFood = () => {
    // Implement this function to add new food
    setNewFood('');
  };

  const fetchDailyActivities = async () => {
    const response = await axios.get('fitness/day/60617f5a853a921edccb8fbf/2932021');
    const {food, exercise} = response.data[0];
    setDailyActivities({food, exercise}); // Übergeben Sie ein Objekt an setDailyActivities
  };
  

  useEffect(() => {
    fetchDailyActivities();
    fetchAvailableFitnessExercises().then(data => {setAvailableExercises(data);});
    fetchAvailableFitnessFood().then(data => {setAvailableFood(data);});
  }, []);

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
      <h2>Guten Tag, {profile.name}!</h2>
      <p>Sie benötigen heute {caloriesNeeded} Kalorien.</p>
      <p>Protein/Eiweiß benötigt: {proteinNeeded.toFixed(2)}g</p>
      <h3>Heutige Aktivitäten:</h3>
      <h4>Essen:</h4>
      {dailyActivities.food.map((food, index) => (
        <p key={index}>{food.foodId}: {food.amount}</p>
      ))}
      <h4>Übung:</h4>
      {dailyActivities.exercise.map((exercise, index) => (
        <p key={index}>{exercise.exerciseId}: {exercise.timeInMinutes}</p>
      ))}
      <div>
        <select value={newExercise} onChange={(e) => setNewExercise(e.target.value)}>
          <option value="">--Übung auswählen--</option>
          {availableExercises.map(exercise => (
            <option key={exercise._id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddExercise}>Übung hinzufügen</button>
      </div>
      <div>
        <select value={newFood} onChange={(e) => setNewFood(e.target.value)}>
          <option value="">--Essen auswählen--</option>
          {availableFood.map(food => (
            <option key={food._id} value={food.id}>
              {food.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddFood}>Essen hinzufügen</button>
      </div>
    </div>
  );
};

export default ProfileDay;
