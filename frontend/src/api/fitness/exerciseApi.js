/** Functions zu communicate with fitness/exercise/ Endpoint */

import axios from '../axiosInstance';

const GET_AVAILABLE_EXERCISES_URL = 'fitness/exercises/';
const EXERCISE_URL = 'fitness/exercise/';


/**
 * Fetch available fitness exercises.
 *
 * @async
 * @returns {Promise<Object[]>} A promise that resolves to an array of available fitness exercises.
 * @throws {Error} On any error, throws an error with a message.
 */

export const fetchAvailableFitnessExercises = async () => {
  try {
    const response = await axios.get(GET_AVAILABLE_EXERCISES_URL);
    return response.data;
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der verfügbaren Exercises: ", error);
    throw error;
  }
};


/**
 * Delete a specific fitness exercise.
 *
 * @async
 * @param {string} exerciseId - The ID of the fitness exercise to delete.
 * @returns {Promise<Object>} A promise that resolves to the data of the deleted exercise.
 * @throws {Error} On any error, throws an error with a message.
 */

export const deleteFitnessExercise = async (exerciseId) => {
  try {
    const response = await axios.delete(`${EXERCISE_URL}${exerciseId}`);
    console.log("Exercise deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Es gab einen Fehler beim Löschen des Exercises: ", error);
    throw error;
  }
};


/**
 * Update a specific fitness exercise.
 *
 * @async
 * @param {Object} updatedFitnessExercise - The data for the fitness exercise to update.
 * @returns {Promise<Object>} A promise that resolves to the data of the updated exercise.
 * @throws {Error} On any error, throws an error with a message.
 */

export const updateFitnessExercise = async (updatedFitnessExercise) => {
  try {
    const response = await axios.put(EXERCISE_URL, convertExerciseDataToUpdateJSON(updatedFitnessExercise));
    console.log("updateFitnessExercise Objekt: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Es gab einen Fehler beim Aktualisieren der Exercise: ", error);
    throw error;
  }
};


/**
 * Convert a fitness exercise data object to a JSON structure suitable for the API.
 *
 * @param {Object} exerciseData - The data of the exercise.
 * @returns {Object} The converted data.
 */

const convertExerciseDataToUpdateJSON = (exerciseData) => {
  return {
    exerciseId: exerciseData._id,
    name: exerciseData.name,
    baseTime: exerciseData.baseTime,
    energyBurned: exerciseData.energyBurned
  };
};