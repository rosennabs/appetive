import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Rating from "react-rating";

const ReviewList = ({ recipeId }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [updated, setUpdated] = useState(0);

  const handleSubmitReviewForm = async (values, { resetForm }) => {
    console.log("Values:", values);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/recipes/${recipeId}/reviews`,
        values
      );
      console.log("Response from review: ", res.data);
      setUpdated((prev) => ++prev);
      resetForm();
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async function () {
      try {
        const reviewsResponse = await axios.get(
          `http://localhost:8080/api/recipes/${recipeId}/reviews`
        );
        console.log(reviewsResponse);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);
        // Check if response is ok
        if (reviewsResponse.status === 200) {
          setRecipeReviews(reviewsData);
        } else {
          console.log("Error fetching recipe reviews");
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchReviews();
  }, [recipeId, updated]);

  return (
    <>
      <div className="w-4/5 my-10 border border-yellow rounded-md px-5 py-5 justify-center">
        <h3 className="text-3xl mt-2 mb-4 font-extrabold">Leave a review </h3>
        <p>We appreciate your feedback</p>
        {recipeReviews.length !== 0 ? (
          recipeReviews.map((review) => (
            <div key={review.recipeId} className="mb-5">
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.review}</p>
            </div>
          ))
        ) : (
          <p>There are no reviews yet</p>
        )}

        <ReviewForm handleSubmitReviewForm={handleSubmitReviewForm} />
      </div>
    </>
  );
};

export default ReviewList;

{
  /* <div className="self-start w-4/5 ml-40 my-32 border border-yellow rounded-md px-5 py-5 flex gap-144">
<div className="w-1/3">

  <ReviewList recipeId={recipe.id} />
</div> */
}
