import axios from '../api/axios';

const EXERCISE_URL = 'fitness/exercises/';

const fetchAvailableFitnessExercises = async () => {
    try {
      const response = await axios.get(EXERCISE_URL);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default fetchAvailableFitnessExercises;