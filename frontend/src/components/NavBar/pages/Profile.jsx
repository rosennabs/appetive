import React from "react";
import FavList from "../FavList";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";

function Profile( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl pt-10 font-bold mx-auto mb-5 text-center">
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

export default Profile;