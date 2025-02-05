import mongoose from 'mongoose';
import axios from "axios";
import Recipe from '../models/RecipeModel.js';

const API_KEY = process.env.SPOONACULAR_API_KEY;
const baseURL = process.env.SPOONACULAR_BASE_URL;
console.log("APIKEY is: ",API_KEY);
console.log("burl is: ",baseURL);



//Function to search for recipes
export const fetchRecipes = async (query) => {
  try {

     // Spoonacular API Call
     const Response = await axios.get(
      `${baseURL}/recipes/complexSearch`,
      {
        params: {
          query, // Pass user query directly
          number: 10, // Limit results (optional)
          apiKey: API_KEY, // Include API key
        },
      }
    );
    
    console.log("axios res:",Response.data);

    return Response.data; 
  } catch (error) {
    console.error("Error searching recipes:", error.message);
    throw new Error("Failed to fetch recipes");
  }
};


// Function to get full recipe details by ID
export const fetchRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`${baseURL}/recipes/${recipeId}/information?includeNutrition=false`, {
      params: { apiKey: API_KEY },
    });

    return response.data; // Return full recipe details
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    throw new Error("Failed to fetch recipe details");
  }
};


export const isSavedRecipe = async ({userId,recipeId}) => {

  try{
    // Convert userId string to ObjectId
    const objectId = new mongoose.Types.ObjectId(String(userId));

    const recipe = await Recipe.findOne({ 
      userId: objectId, 
      recipeId
    });

    return !!recipe;
  } catch(err){
    
    console.error("Error finding recipe", err.message);
    throw new Error("Database failure");
  }
}



export const createRecipe = async(recipeData) => {
  try{
    
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    return newRecipe;

  } catch(error){
    console.error("Error creating recipe", error.message);
    throw new Error("Database Error");
  }
}



export const fetchSavedRecipes = async (userId) => {

  try {
    return await Recipe.find({ userId })
    
  } catch (error) {
    console.error("Error finding saved recipes:", error.message);
    throw new Error("Failed to fetch saved recipes");
  }
}