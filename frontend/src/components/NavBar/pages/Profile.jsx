import React , { useEffect, useState, } from "react";
import FavList from "../../FavList";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profile () {

  const loggedIn = localStorage.token;
  const [ username, setUsername ] = useState('');

  useEffect(() => {
    const getUsername = async (token) => {
      try {
        const response = await axios.post(`http://localhost:8080/api/user/`, token);
        console.log(response);
        setUsername(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
      };
    }
    getUsername(loggedIn);
  }, []);

  return (
    <div className="my-5">
    { loggedIn ? (
      <div>
      <h1 className="text-center">{username}'s Profile</h1>
      <FavList />
    </div>
    ) : (
      <p className="text-center text-xl">
        You must <Link to="/login" className="font-bold text-brown-light hover:underline">log in</Link> to see this content.
      </p>
    )}
  </div>
  )
};