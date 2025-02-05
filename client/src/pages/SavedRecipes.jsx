import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Pagination, Button, Alert } from "react-bootstrap";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedRecipe } from "../redux/slices/recipeSlice";
import { toast } from "react-toastify";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await api.get("/saved-recipes"); // Adjust API route
        console.log("returned result: ",response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };
    fetchSavedRecipes();
  }, []);


  const handleView = async (recipe) => {
    if (!recipe) {
      toast.error("Recipe is not available");
      return;
    }

    try {
      dispatch(setSelectedRecipe(recipe));
      navigate("/recipe-detail");
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      toast.error("Error fetching recipe details");
    } 
  };

  // Get current page recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Saved Recipes</h2>

      {recipes.length === 0 ? (
        <Alert variant="info" className="text-center">
          No saved recipes yet!
        </Alert>
      ) : (
        <>
          <Row>
            {currentRecipes.map((recipe) => (
              <Col key={recipe._id} md={6} lg={4} className="mb-4">
                <Card className="shadow">
                  <Card.Img
                    variant="top"
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">{recipe.title}</Card.Title>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" size="sm" onClick={()=>handleView(recipe)}>
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination className="justify-content-center">
            {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default SavedRecipes;
