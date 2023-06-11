// actions/availableFoodActions.js
import fetchFoodFromApi from '../api/fitnessFoodApi';
import { setAvailableFood } from '../reducers/availableFoodReducer';

// Thunk action creator
export const fetchAvailableFood = () => async dispatch => {
  const food = await fetchFoodFromApi();
  dispatch(setAvailableFood(food));
};
