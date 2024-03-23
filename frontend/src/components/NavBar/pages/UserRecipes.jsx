import React from "react";
import AuthenticationError from "../../AuthenticationError";
import useAuthentication from "../../../hooks/useAuthentication";
import UserRecipesList from "../UserRecipesList";

function UserRecipes( {username} ) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-4xl pt-10 font-bold mx-auto mb-5 text-center">
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