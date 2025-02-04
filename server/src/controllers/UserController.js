import generateTokens from "../utils/generateTokens.js";
import userService from '../services/userService.js'
import { fetchRecipes,fetchRecipeDetails } from "../services/recipeService.js";




const googleLogin = async (req, res, next) => {
  try {
    const { googleToken } = req.body;
    if (!googleToken) {
      const error = new Error("The verifyIdToken method requires an ID Token");
      error.name = "ValidationError";
      throw error;
    }

    const googleUser = await userService.googleLogin(googleToken);
    const token = generateTokens(res, googleUser._id.toString());

    res.status(200).json({
      _id: googleUser._id,
      name: googleUser.name,
      email: googleUser.email,
      token,
    });
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    next(error);
  }
};





const logout = async (req, res, next) =>{
  
  try {
    await userService.clearCookie(req,res);
    res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
}



const searchRecipes = async (req, res) => {
  console.log("hitt SRRRRRRRRRRRRRRRR");
  
  try {
    // Extract the query parameter from request
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    
    const recipes = await fetchRecipes(query);
    
    // Send response back to frontend
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};





const getRecipeDetails = async (req, res) => {
  console.log("hitt RDDDDDDDDDDDDDDDDDDDDDDDD");
  try {
    // Extract the query parameter from request
    const { recipeId } = req.query;
    console.log("recipe id: ",recipeId);
    if (!recipeId) {
      return res.status(400).json({ message: "RecipeId is required" });
    }
    
    const recipeDetails = await fetchRecipeDetails(recipeId);
    console.log("recipe details: ",recipeDetails);
    
    // Send response back to frontend
    res.json(recipeDetails);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export default {
  googleLogin,
  logout,
  searchRecipes,
  getRecipeDetails,
};

