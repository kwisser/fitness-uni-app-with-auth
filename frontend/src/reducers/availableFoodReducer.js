// availableFoodReducer.js
const initialState = [];

// Action types
export const SET_AVAILABLE_FOOD = 'SET_AVAILABLE_FOOD';

// Action creators
export const setAvailableFood = food => ({ type: SET_AVAILABLE_FOOD, food });

// Reducer
const availableFoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_FOOD:
      return action.food;
    default:
      return state;
  }
};

export default availableFoodReducer;
