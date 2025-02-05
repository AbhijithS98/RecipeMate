import express from 'express';
import userController from '../controllers/UserController.js'
import RecipeController from '../controllers/RecipeController.js';
import verifyUserToken from '../middlewares/verifyUser.js';

const router = express.Router();

//user specific routes
router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/google-login',userController.googleLogin);
router.post('/logout',userController.logout);
router.post('/refresh-token',userController.refreshToken);

//recipe specific routes
router.get('/recipes/search',RecipeController.searchRecipes);
router.get('/recipes/details',RecipeController.getRecipeDetails);
router.post('/save-recipe',verifyUserToken,RecipeController.saveRecipe);

export default router;
