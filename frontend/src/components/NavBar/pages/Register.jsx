import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaExclamationCircle } from "react-icons/fa";

function Register({ setAuth }) {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(
        <div>
          <FaExclamationCircle className="inline-block mr-1" /> 
          Name is required
        </div>
      ),
      email: Yup.string()
        .email(
          <div>
            <FaExclamationCircle className="inline-block mr-1" /> 
            Invalid email address
          </div>
        )
        .required(
          <div>
            <FaExclamationCircle className="inline-block mr-1" /> 
            Email is required
          </div>
        ),
      password: Yup.string().required(
        <div>
          <FaExclamationCircle className="inline-block mr-1" /> 
          Password is required
        </div>
      ),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://localhost:8080/auth/register`,
          values
        );

        //Save token in localStorge
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <Fragment>
      <h1 className="text-4xl pt-10 font-bold mx-auto text-center">
        Create Your Account
      </h1>
      <h1 className="text-yellow text-xl pt-3 pb-10 mx-auto text-center">
        Welcome to Appetive!
      </h1>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg justify-self-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="pt-3">
          <button
            className="bg-yellow rounded-xl py-2 px-6 hover:bg-brown-light hover:text-darker-white"
            type="submit"
          >
            SIGN UP
          </button>

          <p className="mt-3 text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="text-brown-light font-bold underline ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default Register;
