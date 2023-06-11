import { createStore, combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';

const rootReducer = combineReducers({
  profile: profileReducer
  // hier kannst du weitere Reducer hinzufügen
});

const store = createStore(rootReducer);
export default store;
