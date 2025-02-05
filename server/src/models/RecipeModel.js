import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the User model
    required: true,
  },
  recipeId:{
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the image
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  healthScore: {
    type: Number,
    required: true,
  },
  sourceUrl: {
    type: String, // External link to the full recipe
  },
  extendedIngredients: [
    {
      id: Number, // Ingredient ID from API (optional)
      name: String, // Ingredient name
      amount: Number, // Quantity
      unit: String, // Measurement unit (e.g., grams, cups)
      original: String, // Full text from API
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;