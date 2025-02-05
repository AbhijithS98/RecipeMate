import { fetchRecipes,
  fetchRecipeDetails,
  isSavedRecipe,
  createRecipe,
} from "../services/recipeService.js";



const searchRecipes = async (req, res) => {
  
  try {
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



const saveRecipe = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      throw new Error("User ID and Recipe ID are required.")
    }

    const existingRecipe = await isSavedRecipe({ userId, recipeId });
    if (existingRecipe) {
      throw new Error("Recipe is already saved!")
    }

    // Save new recipe
    const newRecipe = createRecipe(req.body);
    
    res.status(201).json({ message: "Recipe saved successfully!", recipe: newRecipe });

  } catch (error) {
    console.error("Error saving recipe:", error.message);
    error.name = 'ValidationError';
    next(error);
  }
};




export default {
  searchRecipes,
  getRecipeDetails,
  saveRecipe,
};