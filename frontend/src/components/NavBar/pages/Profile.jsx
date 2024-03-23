import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";

function Profile( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl pt-10 font-bold mx-auto mb-5 text-center">
            {username}'s Recipes
          </h1>
          <div className="flex justify-around w-1/2 mx-auto">
            <Link to="/my-favs" className="mx-5 font-bold text-xl hover:text-yellow">Favourites</Link>
            <Link to="/my-recipes" className="mx-5 font-bold text-x hover:text-yellow">Added By You</Link>
          </div>
        </div>
      ) : (
        <AuthenticationError />
      )}
    </div>
  );
}

export default Profile;