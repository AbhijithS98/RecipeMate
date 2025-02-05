import User from "../models/UserModel.js";
import { GoogleTokenVerify } from "../utils/googleTokenVerify.js";
import generateTokens from "../utils/generateTokens.js";

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
    throw error;
  }
}


const login = async (email, password, res) =>{
    
  try {   
    console.log("email is: ",email);
     
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = generateTokens(res,user._id)
    return {user,token};

  } catch (error) {  
    throw error;
  }
}





const registerUser = async ({name, email, password}) => {
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {  
      throw new Error('User already registerd with this email');
    }

    const newUser = new User({ name, email, password });  
    await newUser.save();
    return newUser;

  } catch (error) {   
    throw error;
  }
}



const clearCookie = async (req, res) =>{
   
  try {
    res.cookie('refreshJwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0),  
    });

  } catch (error) {  
    
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
  login,
  registerUser,
};