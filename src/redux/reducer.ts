import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your individual reducers here

const rootReducer = combineReducers({
  user: userReducer, // This is just an example; replace with your actual slices
});

export default rootReducer;