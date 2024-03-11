import axios from "axios";
import { useEffect, useState } from "react";

const RecipeDetails = function ({ id }) {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipe = async function () {
      try {
        // Fetch recipe details
        const recipeResponse = await axios.get(
          `http://localhost:3000/api/recipes/5`
        );
        console.log(recipeResponse);
        const recipeData = recipeResponse.data;
        console.log(recipeData);

        // Check if response is ok
        if (recipeResponse.status === 200) {
          setRecipeDetails(recipeData);
        } else {
          console.error("Error fetching recipe:", recipeData);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <>
      {recipeDetails && (
        <div>
          <h1>{recipeDetails.title}</h1>
          <img src={recipeDetails.image} alt="" />
          <p>Instructions: {recipeDetails.instructions}</p>
          <p>No. of servings: {recipeDetails.number_of_servings}</p>
          <p>Preparation time: {recipeDetails.prep_time} minutes</p>
          <p>Proteins: {recipeDetails.proteins}</p>
          <p>Carbs: {recipeDetails.carbs}</p>
          <p>Fats: {recipeDetails.fats}</p>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
