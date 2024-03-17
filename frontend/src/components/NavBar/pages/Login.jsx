import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = inputs;

  //Function to handle onChange for inputs
  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Function to handle onSubmit for login
  const handleOnSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        body
      );

      //Save token to localStorage
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-4xl pt-10 font-bold mx-auto text-center">Log into Your Account</h1>
      <h1 className="text-yellow text-xl pt-3 pb-10 mx-auto text-center">Welcome back to Appetive!</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg justify-self-center"
        onSubmit={handleOnSubmitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="pt-3">
          <button
            className="bg-yellow rounded-xl py-2 px-6"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default Login;
