import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from "../redux/slices/userAuthSlice";
import signupCover from '../assets/signup-cover.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    };

    try {
    
      const response = await axios.post(`${BACKEND_URL}/api/register`, {
        name,
        email,
        password,
      });

      // Handle successful registration
      if (response.status === 201) {
        toast.success('Signup successful!');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate("/login")      
      }
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg || 'Registration failed. Please try again.');
      console.error('Error during signup:', error);
    }
    
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    console.log("google token: ",token);

    try {
        const res = await fetch(`${BACKEND_URL}/api/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ googleToken: token }),
        });

      const data = await res.json();
      console.log("googleUserdata:",data); 
      dispatch(setCredentials(data));
      toast.success("Logged in successfully!");
      navigate('/')
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      console.error('Google Login Error:', error);
    }
  };

  const handleGoogleFailure = () => {
    toast.error('oops Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
    <div className="d-flex justify-content-center align-items-center min-vh-100"
    style={{
      backgroundImage: `url(${signupCover})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="card p-4 shadow-sm bg-dark bg-opacity-75 text-white" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ConfirmPassword</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <div className="text-center my-3">OR</div>

       
        <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
        />

        <p className="text-center mt-3">
          Already have an account? <span className="text-primary" style={{cursor: "pointer"}} onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
