import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRecipe: JSON.parse(sessionStorage.getItem("selectedRecipe")) ||null, // Store the selected recipe
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
      sessionStorage.setItem("selectedRecipe", JSON.stringify(action.payload));
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
      sessionStorage.removeItem("selectedRecipe"); 
    },
  },
});

export const { setSelectedRecipe, clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
