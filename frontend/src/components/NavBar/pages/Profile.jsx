import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";
import UserFavs from "./UserFavs";
import UserRecipes from "./UserRecipes";

function Profile( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl pt-10 font-bold mx-auto mb-5 text-center">
            {username}'s Recipes
          </h1>
          <Link to="/my-favs">Favourites List</Link>
          <Link to="/my-recipes">Added By You</Link>
        </div>
      ) : (
        <AuthenticationError />
      )}

      <Routes>
        <Route path="/my-favs" element={<UserFavs />} />
        <Route path="/my-recipes" element={<UserRecipes />} />
      </Routes>
    </div>
  );
}

export default Profile;