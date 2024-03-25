import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Rating from "react-rating";
import * as Yup from "yup";
import { FaExclamationCircle } from "react-icons/fa";

function ReviewForm({ handleSubmitReviewForm }) {
  const initialValues = {
    review: "",
    rating: 1,
  };

  const validationSchema = Yup.object().shape({
    review: Yup.string().required(
      <div>
        <FaExclamationCircle className="inline-block mr-1" /> Review can't be
        blank
      </div>
    ),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitReviewForm}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="flex gap-6 w-full">
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
                alt="User profile image"
                className="w-16 h-16 rounded-full mt-2"
              />
              <div className="flex-col">
                <div>
                  <label htmlFor="rating"></label>

                  <Rating
                    initialRating={values.rating}
                    onChange={(value) => setFieldValue("rating", value)}
                    emptySymbol={
                      <span className="text-gray-400 text-lg">&#9734;</span>
                    }
                    fullSymbol={
                      <span className="text-yellow text-lg">&#9733;</span>
                    }
                    className="text-3xl"
                  />
                </div>

                <div className="w-128 mb-3">
                  <label htmlFor="review"></label>
                  <Field
                    as="textarea"
                    id="review"
                    name="review"
                    placeholder="Write your review here"
                    className="w-full h-20 bg-transparent resize-none focus:outline-none border-2 p-2 rounded-xl focus:border-yellow focus:border-opacity-50"
                    value={values.review}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="review"
                    component="div"
                    className="error text-red-600 text-sm"
                  />
                </div>
                <div className="mt-0 mb-10">
                  <button
                    type="submit"
                    className="bg-yellow py-1 px-6 rounded-3xl hover:text-darker-white hover:bg-brown-light"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ReviewForm;
