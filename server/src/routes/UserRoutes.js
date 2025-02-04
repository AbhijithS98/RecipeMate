import express from 'express';
import userController from '../controllers/UserController.js'

const router = express.Router();

router.post('/google-login',userController.googleLogin);
router.post('/logout',userController.logout);
router.get('/recipes/search',userController.searchRecipes);
router.get('/recipes/details',userController.getRecipeDetails);

export default router;
