import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import profileReducer from './reducers/profileReducer';
import availableExercisesReducer from './reducers/availableExercisesReducer.js';
import availableFoodReducer from './reducers/availableFoodReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  availableExercises: availableExercisesReducer,
  availableFood: availableFoodReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
