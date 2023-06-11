import axios from '../api/axios';

const GET_EXERCISES_URL = 'fitness/exercises/';
const EXERCISE_URL = 'fitness/exercise/';


const fetchAvailableFitnessExercises = async () => {
    try {
      const response = await axios.get(GET_EXERCISES_URL);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteFitnessExercise = (exercise_id) => {
    axios.delete(EXERCISE_URL + exercise_id)
      .then((response) => {
        console.log("Exercise deleted:", response.data);
        // Perform further actions after successful deletion if needed.
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const updateFitnessExercise = (newExerciseData) => {
    axios.put(EXERCISE_URL, convertExerciseDataToUpdateJSON(newExerciseData))
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // Perform further actions after successful save if needed.
      })
      .catch((error) => {
        console.log(error);
        // Perform error handling if needed.
      });
  };

  const convertExerciseDataToUpdateJSON = (exerciseData) => {
    return {
      exerciseId: exerciseData._id,
      name: exerciseData.name,
      baseTime: exerciseData.baseTime,
      energyBurned: exerciseData.energyBurned
    };
  };

export default fetchAvailableFitnessExercises;