import express from 'express';
import userController from '../controllers/UserController.js'

const router = express.Router();

router.post('/google-login',userController.googleLogin);

export default router;
