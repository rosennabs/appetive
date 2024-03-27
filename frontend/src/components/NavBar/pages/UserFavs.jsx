import React from "react";
import FavList from "../FavList";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";

function UserFavs( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div className="mb-28">
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl pt-12 pb-0 font-bold mx-auto text-center">
            {username}'s Favourite Recipes
          </h1>
          <FavList />
        </div>
      ) : (
        <AuthenticationError />
      )}
    </div>
  );
}

export default UserFavs;