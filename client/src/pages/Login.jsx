import React, {useState} from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/userAuthSlice";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import loginCover from '../assets/login-cover.jpg'
import api from "../utils/axiosInstance";

const loginPageStyle = {
  background: `url(${loginCover}) no-repeat center center fixed`,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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


  const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Implement login logic
    try{
      const response = await api.post(`/login`, { Email,password });
      const { _id, name, email, token } = response?.data;
      dispatch(setCredentials({
        _id,
        name,
        email,
        token
      }))
      toast.success("Logged in successfully!")
      navigate("/")

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
    <div className="login-page" style={loginPageStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-lg bg-dark bg-opacity-75 text-white">
              <Card.Body>
                <h2 className="text-center mb-4">Welcome Back!</h2>
               
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  useOneTap
                />
                <hr />
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email" 
                      value={Email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)} 
                      required />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <span className="text-danger" role="button" onClick={() => navigate("/sign-up")}>
                     <strong> Sign Up </strong>
                  </span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </GoogleOAuthProvider>
  );
};

export default Login;
