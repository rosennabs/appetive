import React, { useContext } from "react";
import { AppDataContext } from "../contexts/AppDataContext";

export default function Recipes({ setSelected }) {
  //Access recipes from state
  const { state, fetchRecipeInfo, searchClicked } = useContext(AppDataContext);
  const { recipes } = state;

  //Function to handle click on a recipe
  const handleRecipeClick = async (recipeId) => {
    const recipeInfo = await fetchRecipeInfo(recipeId);
    window.scrollTo({
      top: 300,
    });
    setSelected(recipeInfo); //Set selected recipe details in state
    console.log(recipeInfo);
  };

  return (
    <div className="mb-28">
      <div className="flex justify-center items-center">
        <img
          src={require("../Images//headers/mainpage.png")}
          alt="Header Image"
          className="h-auto w-4/5 mt-16 mb-20"
        />
      </div>

      <div className="flex items-center justify-end">
        {searchClicked && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="hover:text-black hover:border-black border-2 border-gray-400 text-gray-400 text-underline py-1 px-10 mb-4 mt-32 ml-16 mr-16 rounded-full"
          >
            Reset
          </button>
        )}
      </div>

      {recipes.length === 0 && searchClicked ? (
        <h1 className="font-bold text-3xl mb-8  text-yellow text-center">
          {" "}
          No results found!{" "}
        </h1>
      ) : (
        <section className="md:container max-w-screen-xl mx-auto flex flex-wrap justify-center">
          {recipes &&
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className="w-56 p-4 mb-4 rounded-md cursor-pointer bg-yellow bg-opacity-10 mr-4 hover:bg-yellow hover:bg-opacity-60"
              >
                <img
                  src={recipe.image}
                  alt="Regular food"
                  className="mx-auto m-2 object-cover"
                  style={{ height: 200, width: 250 }}
                />
                <p className="mx-auto max-w-xs text-sm text-center font-bold text-brown-light">
                  {recipe.title}
                </p>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
