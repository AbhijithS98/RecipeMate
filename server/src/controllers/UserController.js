import generateTokens from "../utils/generateTokens.js";
import userService from '../services/userService.js'
import  jwt  from "jsonwebtoken";


const login = async(req, res, next) => {  

    try {
      const { Email, password } = req.body;          
      const {user,token} = await userService.login(Email,password,res)
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });

    } catch (err) {    
      console.error("Error in login:", err.message);
      err.name = 'ValidationError';
      next(err);
    }
}
         


const register = async(req, res, next) => {  

  try {
    const { name, email, password } = req.body;           
    const newUser = await userService.registerUser({ name,email,password });
      
    res.status(201).json({
      message: 'User successfully registered',
      user: newUser,
    });

  } catch (err) {    
    console.error("Error in register:", err.message);
    err.name = 'ValidationError';
    next(err);
  }
}



const googleLogin = async (req, res, next) => {

  try {

    const { googleToken } = req.body;
    if (!googleToken) {
      throw new Error("The verifyIdToken method requires an ID Token");
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
    console.error("Error in google login:", error.message);
    err.name = 'ValidationError';
    next(error);
  }
};





const logout = async (req, res, next) =>{
  
  try {
    await userService.clearCookie(req,res);
    res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    console.error('Logout error:', error);
    err.name = 'ValidationError';
    next(error);
  }
}




const refreshToken = async(req, res, next) => {
  const refreshToken = req.cookies.refreshJwt;

  if (!refreshToken) {
    console.log("no refresh token in the cookie")
    res.status(401).json({ message: 'No refresh token provided, authorization denied' });
    return;
  } 

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    
    console.log("refreshed access token");
    
    res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error.message);
    await userService.clearCookie(req,res);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};





export default {
  login,
  googleLogin,
  logout,
  refreshToken,
  register,
};

