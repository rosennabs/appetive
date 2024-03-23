import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Rating from "react-rating";
import { format } from "date-fns";

const ReviewList = ({ recipeId }) => {
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [updated, setUpdated] = useState(0);
  const [username, setUsername] = useState("");

  const token = localStorage.token;

  //Refactor and create custom hook for getUsername later
  useEffect(() => {
    const getUsername = async (token) => {
      try {
        const response = await axios.post(`http://localhost:8080/api/user/`, {
          token,
        });
        setUsername(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    getUsername(token);
  }, []);

  const handleSubmitReviewForm = async (values, { resetForm }) => {
    console.log("Values:", values);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/recipes/${recipeId}/reviews`,
        values,
        {
          headers: { token: token },
        }
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
        
        // Format TIMESTAMP to display
        const reviewsData = reviewsResponse.data.map((review) => ({
          ...review,
          created_at: format(
            new Date(review.created_at),
            "MMMM dd, yyyy - hh:mm aa"
          ),
        }));

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
              <div className="flex">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
                  alt="User profile image"
                  className="w-10 h-10 rounded-3xl mr-4"
                />
                <div className="flex-col">
                  <p className="text-brown-light">{username}</p>
                  <p className="text-brown-light text-sm">
                    {review.created_at}
                  </p>
                  <Rating
                    initialRating={review.rating}
                    emptySymbol={
                      <span className="text-gray-400 text-lg">&#9734;</span>
                    }
                    fullSymbol={
                      <span className="text-yellow text-lg">&#9733;</span>
                    }
                    className="text-3xl"
                  />
                  <p>Comment: {review.review}</p>
                </div>
              </div>
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
