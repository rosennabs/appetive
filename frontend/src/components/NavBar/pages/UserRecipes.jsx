import React from "react";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";
import UserRecipesList from "../UserRecipesList";

function UserRecipes( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div className="mb-28 pt-12">
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl py-0 font-bold mx-auto text-center">
            Recipes Added By {username}
          </h1>
          <UserRecipesList />
        </div>
      ) : (
        <AuthenticationError />
      )}
    </div>
  );
}

export default UserRecipes;