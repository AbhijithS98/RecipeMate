import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../redux/slices/userAuthSlice.js';
import { toast } from 'react-toastify';
import api from "../utils/axiosInstance.js";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userAuth);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = async (e) => {
    try {
      const res = await api.post('/logout');
      dispatch(clearCredentials());
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Logout failed. Please try again.");
    }
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">RecipeMate</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link"  href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/explore-recipes")}>Explore</a>
            </li>
            {userInfo? (
              <li className="nav-item">
                  <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                  style={{ borderRadius: '80px' }}
                >
                  <span>Logout</span>
                </button>
              </li>
            ) : 
            (
              <li className="nav-item">
                  <a className="nav-link" href="/sign-up">Sign Up</a>
              </li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Header;
