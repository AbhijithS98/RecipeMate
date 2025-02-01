import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import coverImage from '../assets/chappathy.jpg'



const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section
        className="position-relative text-center text-white d-flex align-items-center justify-content-center"
        style={{
          height: "90vh",
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative text-center">
          <h1 className="display-3 fw-bold">Welcome to RecipeMate</h1>
          <p className="lead">Your go-to place for discovering and sharing delicious recipes.</p>
          <button className="btn btn-warning btn-lg mt-3" onClick={() => navigate("/explore-recipes")}>Explore Recipes</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container text-center my-5">
        <h2 className="fw-bold">Why Choose RecipeMate?</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h5>Discover New Recipes</h5>
              <p>Find thousands of delicious recipes curated for every taste and occasion.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h5>Share Your Creations</h5>
              <p>Upload your own recipes and inspire a community of food lovers.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h5>Save Your Favorites</h5>
              <p>Create your personal recipe collection and access them anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center my-5">
        <button className="btn btn-dark btn-lg" onClick={() => navigate("/signup")}>Join Now</button>
      </div>

    </div>
  );
};

export default LandingPage;
