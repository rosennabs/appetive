import React from "react";
import FavList from "../../FavList";
import { Link } from "react-router-dom";

export default function Profile () {

  const loggedIn = localStorage.token;

  return (
    <div className="my-5">
    { loggedIn ? (
      <div>
      <h1 className="text-center">User Profile for {loggedIn}</h1>
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