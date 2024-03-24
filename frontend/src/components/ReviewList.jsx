import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Rating from "react-rating";
import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import useAuthentication from "../hooks/useAuthentication";
import { jwtDecode } from "jwt-decode";

const ReviewList = ({ recipeId }) => {
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [updated, setUpdated] = useState(0);
  const { isAuthenticated } = useAuthentication();

  const token = localStorage.token;
  const current_user_id = jwtDecode(token).user;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/reviews/${recipeId}`,
        values,
        {
          headers: { token: token },
        }
      );
      // console.log("Response from review: ", res.data);
      setUpdated((prev) => ++prev);
      resetForm();
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  const handleDelete  = async (review_id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/reviews/${review_id}/delete`, 
      {
        headers: { token: token },
      });
      // console.log("Res from delete fucntion", res.data);
      setUpdated((prev) => ++prev);
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  }

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
        <img
          src={require("../Images/review-header.png")}
          alt="Header Image"
          className="h-auto w-4/5 mt-24"
        />
      <div className="w-2/3 my-8 p-8 justify-center">
        <div>
          {recipeReviews.length !== 0 ? (
            recipeReviews.map((review) => (
              <div
                key={review.recipeId}
                className="mb-4 bg-yellow bg-opacity-10 px-4 py-4 rounded-3xl filter hover:drop-shadow-2xl"
              >
                <div className="flex">
                  <div>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
                      alt="User profile image"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  </div>
                  <div className="flex-col mr-14 flex-grow">
                    <p className="text-brown-light">Appetive User</p>
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

                  {isAuthenticated && review.user_id == current_user_id ? (
                    <FaTrashAlt 
                      className="grid justify-items-end text-red-400 text-lg hover:cursor-pointer hover:rotate-12 hover:text-red-700"
                      onClick={() => handleDelete(review.id)}
                    />
                  ) : (
                    <FaTrashAlt className="hidden"/>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg italic mt-10 mr-0">
              No reviews yet! Be the first to share your experience.
            </p>
          )}
          <p className="text-3xl text-brown-dark mt-10 font-bold">
            Leave a review
          </p>
          <p className="text-yellow mb-5 text-lg">
            We appreciate your feedback!
          </p>
          <ReviewForm handleSubmitReviewForm={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default ReviewList;
