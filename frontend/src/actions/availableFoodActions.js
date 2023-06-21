// actions/availableFoodActions.js
import { fetchAvailableFitnessFood } from '../api/fitness/foodApi';
import { setAvailableFood } from '../reducers/availableFoodReducer';

// Thunk action creator
export const fetchAvailableFood = () => async dispatch => {
  const food = await fetchAvailableFitnessFood("");
  dispatch(setAvailableFood(food));
};
