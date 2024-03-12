import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const renderInstructions = (instructions) => {
  const regex = /(<ol>|<\/ol>|<li>|<\/li>|\\n|Instructions)/g;
  const filteredInstructions = instructions.replace(regex, "");
  console.log(filteredInstructions.split("."));
  return filteredInstructions
    .split(".")
    .map((instruction) => <li class="mb-3">{instruction}</li>);
};

const RecipeDetails = function () {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);

  useEffect(() => {
    const fetchRecipeAndReviews = async function () {
      try {
        // Fetch recipe details
        const recipeResponse = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
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

        // Fetch recipe reviews
        const reviewsResponse = await axios.get(
          `http://localhost:3000/api/recipes/${id}/reviews`
        );
        console.log(reviewsResponse);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);

        // Check if response is ok
        if (reviewsResponse.status === 200) {
          setRecipeReviews(reviewsData);
        } else {
          console.error("Error fetching recipe reviews:", recipeData);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchRecipeAndReviews();
  }, [id]);

  return (
    <>
      {recipeDetails && (
        <div>
          <h2 class="text-4xl font-extrabold dark:text-white mb-10">
            {recipeDetails.title}
          </h2>
          <img class="mb-10" src={recipeDetails.image} alt="" />
          <div class="w-[800px] max-w-[800px]">
            <p class="text-2xl font-extrabold dark:text-white mb-5">
              Instructions:
            </p>
            <ol class="list-decimal">
              {renderInstructions(recipeDetails.instructions)}
            </ol>
          </div>
          <p class="mt-10 text-xl">
            No. of servings: {recipeDetails.number_of_servings}
          </p>
          <p class="mt-3 text-xl">
            Preparation time: {recipeDetails.prep_time} minutes
          </p>
          <p class="mt-3 text-xl">Proteins: {recipeDetails.proteins}</p>
          <p class="mt-3 text-xl">Carbs: {recipeDetails.carbs}</p>
          <p class="mt-3 text-xl">Fats: {recipeDetails.fats}</p>
        </div>
      )}

      <h3 class="text-3xl mt-20 font-extrabold">Reviews</h3>
      {recipeReviews.length !== 0 ? (
        recipeReviews.map((review) => (
          <div key={review.id} class="mb-5">
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.review}</p>
          </div>
        ))
      ) : (
        <p>There are no reviews yet</p>
      )}
    </>
  );
};

export default RecipeDetails;
