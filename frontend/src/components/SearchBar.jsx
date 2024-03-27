import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { AppDataContext } from "../contexts/AppDataContext";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar() {
  const { handleSearchSubmission, toggleSearchBar } =
    useContext(AppDataContext);

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values, actions) => {
        handleSearchSubmission(values);
        console.log("values: ", values);

        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>
          
          <div className="flex justify-center items-center bg-white border border-gray-300 px-8 mb-8 shadow-lg py-8">
          
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Search recipes"
            autoComplete='off'
            className=" w-96 px-4 py-2 text-xl border border-gray-300 rounded-md focus:outline-none focus:border-amber-500"
            />

            <div className="ml-4 cursor-pointer" onClick={() => handleSubmit()}>
              <FaSearch className="text-xl text-brown-light hover:text-black"/>
            </div>

            <div
              className="ml-4 cursor-pointer underline underline-offset-2"
              onClick={() => toggleSearchBar()}
            >
              <FaTimes className="text-xl text-brown-light hover:text-black"/>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
