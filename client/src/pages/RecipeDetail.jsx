import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../styles/recipeDetail.css'
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";


const RecipeDetails = () => {
  const { selectedRecipe } = useSelector((state) => state.recipe);
  const { userInfo } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading state
    return () => clearTimeout(timer);
  }, []);


  const saveRecipe = async(recipe)=>{
    if(!userInfo){
      toast.info("You need to be logged in..! Please Login.")
      navigate("/login")
      return
    }

    if(!recipe){
      toast.error("Recipe must be provided")
      return
    }

    // Prepare the recipe data object
    const recipeData = {
      userId: userInfo._id,
      recipeId: recipe.id || recipe.recipeId,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      healthScore: recipe.healthScore,
      sourceUrl: recipe.sourceUrl,
      extendedIngredients: recipe.extendedIngredients?.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        original: ingredient.original,
      })),
      instructions: recipe.instructions,
    };

    try{
      const res = await api.post("/save-recipe",recipeData)
      // if (res.data.success) {
      //   toast.success("Recipe saved successfully!");
      // }
      toast.success("Recipe saved successfully!");
    }catch(error){
      console.error("Error saving recipe:", error);
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!selectedRecipe) {
    return (
      <div className="no-recipe">
        <h2>No Recipe Found</h2>
        <button onClick={() => navigate(-1)} className="back-button">
          🔙 Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-container">
      {/* Hero Section */}
      <h1 className="recipe-title">{selectedRecipe.title}</h1>
      <div className="recipe-image-container">
        <img src={selectedRecipe.image} alt={selectedRecipe.title} className="recipe-image" />
      </div>

      {/* Summary */}
      <p className="recipe-summary">{selectedRecipe.summary.replace(/<[^>]+>/g, "")}</p>

      {/* Recipe Info */}
      <div className="recipe-info">
        <div><span>⏳</span> Ready in {selectedRecipe.readyInMinutes} mins</div>
        <div><span>🍽</span> {selectedRecipe.servings} Servings</div>
        <div><span>💚</span> Health Score: {selectedRecipe.healthScore}</div>
        <div>
          <span>🔗</span>
          <a href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">View Original Recipe</a>
        </div>
      </div>

      {/* Ingredients Section */}
      <h2 className="section-title">🛒 Ingredients</h2>
      <ul className="ingredient-list">
        {selectedRecipe.extendedIngredients?.map((ingredient) => (
          <li key={ingredient.id} className="ingredient-item">
            <span>🥄</span> {ingredient.original}
          </li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="section-title">👨‍🍳 Instructions</h2>
      <p className="instructions">{selectedRecipe.instructions}</p>

      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={() => saveRecipe(selectedRecipe)} className="back-button"> Save Recipie</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
