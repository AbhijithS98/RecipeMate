import User from "../models/UserModel.js";
import { GoogleTokenVerify } from "../utils/googleTokenVerify.js";

const googleLogin = async (googleToken) => {
  try {
    const payload = await GoogleTokenVerify(googleToken);
    if (!payload) {
      throw new Error('Failed to verify Google token');
    }

    const { email, name } = payload;
    if (!email || !name) {
      throw new Error('Email and name are required from Google token');
    }

    let googleUser = await User.findOne({ email });
    if (!googleUser) {
      googleUser = await createGoogleUser(email, name);
    }

    return googleUser;
  } catch (error) {
    console.error('Google login error:', error);
    throw new Error('Error occurred during Google login');
  }
};


const clearCookie = async (req, res) =>{
   
  try {
    res.cookie('refreshJwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0),  
    });

  } catch (error) {
    error.name = 'ValidationError';  
    throw error;
  }
}

const createGoogleUser = async (email, name) => {
  const newUser = new User({
    name,
    email,
    password: 'google_oauth', 
  });

  return newUser.save();
};


export default {
  googleLogin,
  clearCookie,
};