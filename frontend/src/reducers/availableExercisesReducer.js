// availableExercisesReducer.js
const initialState = [];

// Action types
export const SET_AVAILABLE_EXERCISES = 'SET_AVAILABLE_EXERCISES';

// Action creators
export const setAvailableExercises = exercises => ({ type: SET_AVAILABLE_EXERCISES, exercises });

// Reducer
const availableExercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return action.exercises;
    default:
      return state;
  }
};

export default availableExercisesReducer;
