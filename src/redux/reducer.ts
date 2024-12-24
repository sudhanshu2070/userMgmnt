import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 

const rootReducer = combineReducers({
  user: userReducer, // actual slices
});

export default rootReducer;