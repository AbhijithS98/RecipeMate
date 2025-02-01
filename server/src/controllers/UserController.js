import generateTokens from "../utils/generateTokens.js";
import userService from '../services/userService.js'

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


export default {
  googleLogin,
  logout,
};

