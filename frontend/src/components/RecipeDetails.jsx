import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";


const renderInstructions = (instructions) => {
  const regex = /(<ol>|<\/ol>|<li>|<\/li>|\\n|Instructions)/g;
  const filteredInstructions = instructions.replace(regex, "");
  console.log(filteredInstructions.split("."));
  return filteredInstructions
    .split(".")
    .map((instruction) => <li className="mb-3">{instruction}</li>);
};

const RecipeDetails = function () {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [updated, setUpdated] = useState(0);

  const onSubmit = async (values, {resetForm}) => {
    console.log("Values:", values);
    try {
      const res = await axios.post(`http://localhost:8080/api/recipes/${id}/reviews`, values);
      console.log('Response from review: ', res.data);
      setUpdated(prev => ++prev);
      resetForm();
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  useEffect(() => {
    const fetchRecipeAndReviews = async function () {
      try {
        // Fetch recipe details
        const recipeResponse = await axios.get(
          `http://localhost:8080/api/recipes/${id}`
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
          `http://localhost:8080/api/recipes/${id}/reviews`
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
  }, [id, updated]);

  return (
    <>
      {recipeDetails && (
        <div>
          <h2 className="text-4xl font-extrabold dark:text-white mb-10">
            {recipeDetails.title}
          </h2>
          <img className="mb-10" src={recipeDetails.image} alt="" />
          <div className="w-[800px] max-w-[800px]">
            <p className="text-2xl font-extrabold dark:text-white mb-5">
              Instructions:
            </p>
            <ol className="list-decimal">
              {renderInstructions(recipeDetails.instructions)}
            </ol>
          </div>
          <p className="mt-10 text-xl">
            No. of servings: {recipeDetails.number_of_servings}
          </p>
          <p className="mt-3 text-xl">
            Preparation time: {recipeDetails.prep_time} minutes
          </p>
          <p className="mt-3 text-xl">Proteins: {recipeDetails.proteins}</p>
          <p className="mt-3 text-xl">Carbs: {recipeDetails.carbs}</p>
          <p className="mt-3 text-xl">Fats: {recipeDetails.fats}</p>
        </div>
      )}

      <div>

      <h3 className="text-3xl mt-20 font-extrabold">Reviews</h3>
      {recipeReviews.length !== 0 ? (
        recipeReviews.map((review) => (
          <div key={review.id} className="mb-5">
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.review}</p>
          </div>
        ))
      ) : (
        <p>There are no reviews yet</p>
      )}

      <ReviewForm onSubmit={onSubmit}/>
    </div>
    </>
  );
};

export default RecipeDetails;
