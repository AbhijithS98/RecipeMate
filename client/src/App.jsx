import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LandingPage from './pages/HomeScreen';
import Signup from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/sign-up' element={<Signup />}/>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App
