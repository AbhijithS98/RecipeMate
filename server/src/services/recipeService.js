import axios from "axios";

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
