// actions/availableExercisesActions.js
import fetchExercisesFromApi from '../api/fitnessExercisesApi';
import { setAvailableExercises } from '../reducers/availableExercisesReducer';

// Thunk action creator
export const fetchAvailableExercises = () => async dispatch => {
  const exercises = await fetchExercisesFromApi();
  console.log(exercises);
  dispatch(setAvailableExercises(exercises));
};
