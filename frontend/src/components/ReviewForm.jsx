import React, { useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import axios from "axios";
import { apiKey, host } from "../config";

function ReviewForm() {
  const initialValues = {
    review: "",
    rating: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('http://localhost:8080/api/recipes/${values.recipeId}/reviews', values);
      console.log('Response from review: ', res.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  return (
    <>
      <h2>Leave a Review</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (

        <Form>
          <div>
            <label htmlFor="rating">Rating</label>
            <Field
              type="number"
              id="rating"
              name="rating"
              className="border-black border-2 rounded-xl"
              min={1}
              max={5}
              value={values.rating}
              onChange={handleChange}
            />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="review">Review</label>
            <Field
              as="textarea"
              id="review"
              name="review"
              className="border-black border-2 rounded-xl"
              value={values.review}
              onChange={handleChange}
            />
            <ErrorMessage name="review" component="div" className="error" />
          </div>

          <button
            type="submit"
            className="border-black border-2 rounded-2xl px-2"
          >
            Submit Reivew
          </button>
        </Form>
        )}
      </Formik>
    </>
  );
}

export default ReviewForm;
