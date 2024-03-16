import React from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";

function ReviewForm({onSubmit}) {
  const user = localStorage.getItem("token");
  const initialValues = {
    user_id: user,
    review: "",
    rating: "",
  };

  return (
    <>
      <h2>Leave a Review</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (

        <Form>
          <div>
            <Field
              name="user_id"
              type="hidden"
              value={values.user_id}
            />
            <ErrorMessage name="review" component="div" className="error" />
          </div>

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
