import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LandingPage from './pages/HomeScreen';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ExploreRecipes from './pages/ExploreRecipies';
import RecipeDetails from './pages/RecipeDetail';
import SavedRecipes from './pages/SavedRecipes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/sign-up' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/explore-recipes' element={<ExploreRecipes />}/>
        <Route path='/recipe-detail' element={<RecipeDetails />}/>
        <Route path='/saved-recipes' element={<SavedRecipes />}/>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App
