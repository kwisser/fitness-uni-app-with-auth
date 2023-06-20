// actions/availableExercisesActions.js
import { fetchAvailableFitnessExercises } from '../api/fitness/exerciseApi';
import { setAvailableExercises } from '../reducers/availableExercisesReducer';

// Thunk action creator
export const fetchAvailableExercises = () => async dispatch => {
  const exercises = await fetchAvailableFitnessExercises();
  dispatch(setAvailableExercises(exercises));
};
