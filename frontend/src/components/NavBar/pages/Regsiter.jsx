import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register( {setAuth} ) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const {name, email, password} = inputs;

  //Function to handle onChange for inputs
  const handleOnChange = e => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  };

  // Function to handle onSubmit for signup
  const handleOnSubmitForm = async (e) => {
    console.log("Form submitted")
    e.preventDefault();

    const body = {name, email, password};

    try {
      const response = await axios.post("http://localhost:3000/auth/register", body)
      console.log(response.data);

      //Save token in localStorge
      localStorage.setItem("token", response.data.token);

      setAuth(true);

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-5xl py-4 mx-auto text-center">Register</h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg justify-self-center" onSubmit={handleOnSubmitForm}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label> 
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => handleOnChange(e)}
          />
        </div>

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
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => handleOnChange(e)}
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
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => handleOnChange(e)}
          />
        </div>

        <button
          className="border-black border-2 rounded-2xl py-2 px-4"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      
    </Fragment>
  );
}

export default Register;
