import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import coverPic from '../assets/3spoons.jpg';
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedRecipe } from "../redux/slices/recipeSlice";

const ExploreRecipes = () => {
  const [query, setQuery] = useState(""); // State for user input
  const [recipes, setRecipes] = useState([]); // State for storing fetched recipes
  const [loading, setLoading] = useState(false); // Loading state
  const [detailsLoading, setDetailsLoading] = useState(null); // Track which button is loading

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a query!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/recipes/search", { params: { query } });
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (recipeId) => {
    if (!recipeId) {
      toast.error("Recipe ID unknown");
      return;
    }

    setDetailsLoading(recipeId); // Track which button is loading
    try {
      const recipeDetails = await api.get("/recipes/details", { params: { recipeId } });
      dispatch(setSelectedRecipe(recipeDetails.data));
      navigate("/recipe-detail");
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      toast.error("Error fetching recipe details");
    } finally {
      setDetailsLoading(null);
    }
  };

  return (
    <Container className="my-5 px-4">
      {/* Promo Section */}
      {recipes.length === 0 && (
        <div
          className="position-relative text-center d-flex align-items-center justify-content-center"
          style={{
            height: "80vh",
            backgroundImage: `url(${coverPic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            overflow: "hidden",
            padding: "20px",
          }}
        >
          {/* Dark Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          ></div>

          {/* Content */}
          <div className="text-center position-relative p-4 text-white">
            <h2 className="fw-bold display-4">Find Your Perfect Recipe!</h2>
            <p className="lead">Enter a dish name to discover delicious recipes.</p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <Form onSubmit={searchRecipes} className="d-flex justify-content-center mt-4">
        <Form.Control
          type="text"
          placeholder="Search for a recipe (e.g., Pasta, Salad)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-50 shadow-sm rounded-pill px-3"
        />
        <Button type="submit" variant="primary" className="ms-2 shadow">
          Search
        </Button>
      </Form>

      {/* Loading State */}
      {loading && <p className="text-center mt-4">Searching for recipes...</p>}

      {/* Recipe Results */}
      <Row className="mt-4">
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <Card className="shadow-sm border-0 rounded">
              <Card.Img
                variant="top"
                src={recipe.image}
                alt={recipe.title}
                className="rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{recipe.title}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => viewDetails(recipe.id)}
                  className="mt-2 shadow"
                  disabled={detailsLoading === recipe.id}
                >
                  {detailsLoading === recipe.id ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Loading...
                    </>
                  ) : (
                    "View Details"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreRecipes;
