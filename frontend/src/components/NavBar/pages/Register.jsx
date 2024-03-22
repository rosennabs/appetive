import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = inputs;

  //Function to handle onChange for inputs
  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Function to handle onSubmit for signup
  const handleOnSubmitForm = async (e) => {
    e.preventDefault();

    const body = { name, email, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        body
      );

      //Save token in localStorge
      localStorage.setItem("token", response.data.token);

      setAuth(true);

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

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
        onSubmit={handleOnSubmitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="name"
          >
            Your Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleOnChange(e)}
          />
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
            value={password}
            onChange={(e) => handleOnChange(e)}
          />
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
            <Link to="/register" className="text-brown-light font-bold underline ml-1">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default Register;
