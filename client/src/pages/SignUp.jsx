import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    // TODO: Send formData to backend API for signup
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
              value={formData.name}
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
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <div className="text-center my-3">OR</div>

        {/* <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>
          <i className="bi bi-google"></i> Login with Google
        </button> */}
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
