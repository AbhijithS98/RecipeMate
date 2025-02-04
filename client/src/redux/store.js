import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice.js';
import recipeReducer from './slices/recipeSlice.js'

const store = configureStore({
  reducer: {
   userAuth: userAuthReducer,
   recipe: recipeReducer,
  }
});

export default store;