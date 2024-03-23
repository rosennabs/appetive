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
        `http://localhost:8080/api/reviews/${recipeId}`,
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
          `http://localhost:8080/api/reviews/${recipeId}`
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
      <div className="w-4/5 my-10 p-8 justify-center">
      <img
          src={require("../Images/review-header.png")}
          alt="Header Image"
          className="h-auto max-w-full mb-8"
        />
        <div>
          {recipeReviews.length !== 0 ? (
            recipeReviews.map((review) => (
              <div key={review.recipeId} className="mb-4 bg-yellow bg-opacity-10 px-4 py-2 rounded-lg filter hover:drop-shadow-2xl">
                <div className="flex">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
                    alt="User profile image"
                    className="w-10 h-10 rounded-3xl mr-4"
                  />
                  <div className="flex-col mr-14">
                    <p className="text-brown-light">{username}</p>
                    <p className="text-brown-light text-sm text-opacity-35 italic">
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
                      readonly={true}
                    />
                    <p className="w-full break-all">{review.review}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg italic mt-10 mr-0">No reviews yet! Be the first to share your experience.</p>
          )}
          <p className="text-3xl text-brown-dark mt-10 font-bold">Leave a review</p>
          <p className="text-yellow mb-5 text-lg">We appreciate your feedback!</p>
          <ReviewForm handleSubmitReviewForm={handleSubmitReviewForm} />
        </div>
      </div>
    </>
  );
};

export default ReviewList;
