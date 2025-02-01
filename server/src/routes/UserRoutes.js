import express from 'express';
import userController from '../controllers/UserController.js'

const router = express.Router();

router.post('/google-login',userController.googleLogin);
router.post('/logout',userController.logout);

export default router;
