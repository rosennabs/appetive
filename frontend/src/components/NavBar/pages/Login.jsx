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
      <h1 className="text-5xl py-10 mx-auto text-center">Login</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg justify-self-center"
        onSubmit={handleOnSubmitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
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

        <button
          className="border-black border-2 rounded-2xl py-2 px-4"
          type="submit"
        >
          Login
        </button>
      </form>
    </Fragment>
  );
}

export default Login;
