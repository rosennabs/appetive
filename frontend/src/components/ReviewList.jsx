import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Rating from "react-rating";
import { format } from "date-fns";
import { FaTrashAlt, FaExclamationCircle } from "react-icons/fa";
import useAuthentication from "../hooks/useAuthentication";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialog } from "primereact/confirmdialog";

const ReviewList = ({ recipeId }) => {
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [updated, setUpdated] = useState(0);
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useAuthentication();

  let token, current_user_id;

  if (isAuthenticated) {
    token = localStorage.token;
    current_user_id = jwtDecode(token).user;
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/reviews/${recipeId}`,
        values,
        {
          headers: { token: token },
        }
      );
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
        const reviewsData = await Promise.all(
          reviewsResponse.data.map(async (review) => {
            try {
              const userResponse = await axios.get(
                `http://localhost:8080/api/reviews/users/${review.user_id}`
              );
              const username = userResponse.data;
              return {
                ...review,
                created_at: format(
                  new Date(review.created_at),
                  "MMMM dd, yyyy - hh:mm aa"
                ),
                username: username,
              };
            } catch (error) {
              console.error(
                "Error fetching username for review:",
                error.message
              );
              return review; // If error occurs, return review without username
            }
          })
        );

        setRecipeReviews(reviewsData);
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchReviews();
  }, [recipeId, updated]);

  const acceptDelete = async (review_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/reviews/${review_id}/delete`,
        {
          headers: { token: token },
        }
      );
      console.log("Res from delete fucntion", res.data);
      console.log("Accepted");
      setUpdated((prev) => ++prev);
      setVisible(false);
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  };

  const rejectDelete = () => {
    setVisible(false);
  };

  return (
    <>
      <img
        src={require("../Images//headers/review-header.png")}
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
                    <p className="text-brown-light">{review.username}</p>
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

                  {isAuthenticated && review.user_id === current_user_id && (
                    <>
                      <FaTrashAlt
                        className="grid justify-items-end text-red-300 text-lg hover:cursor-pointer hover:rotate-12 hover:text-red-600"
                        onClick={() => setVisible(true)}
                        label="Delete"
                      />
                      <ConfirmDialog
                        visible={visible}
                        onHide={() => setVisible(false)}
                        message={
                          <p className="text-lg py-5 text-red-400 mb-2">
                            <FaExclamationCircle className="text-xl inline-block mr-2" />
                            Do you want to delete?
                          </p>
                        }
                        accept={() => acceptDelete(review.id)}
                        reject={rejectDelete}
                        acceptClassName="bg-yellow px-4 py-2 rounded-md shadow-md mr-2 hover:bg-brown-light hover:text-darker-white"
                        rejectClassName="bg-yellow px-4 py-2 rounded-md shadow-md hover:bg-brown-light hover:text-darker-white mr-2 ml-28"
                        className="bg-white shadow-2xl  px-8 py-5 rounded-3xl w-80"
                      />
                    </>
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

          {isAuthenticated ? (
            <ReviewForm handleSubmitReviewForm={handleSubmit} />
          ) : (
            <p className="italic text-gray-500 ml-5">
              To leave a review, please log in or create an account.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
