import React, { useContext } from "react";
import { AppDataContext } from "../contexts/AppDataContext";

export default function Recipes({ setSelected }) {
  //Access recipes from state
  const { state, fetchRecipeInfo, searchClicked } = useContext(AppDataContext);
  const { recipes } = state;

  //Function to handle click on a recipe
  const handleRecipeClick = async (recipeId) => {
    const recipeInfo = await fetchRecipeInfo(recipeId);
    setSelected(recipeInfo); //Set selected recipe details in state
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-l mb-4 ml-16 uppercase font-serif text-gray-500">
          {" "}
          Make Yourself A Treat
        </h1>

        {searchClicked && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="hover:bg-yellow border-2 border-black text-black opacity-25 text-underline py-1 px-10 mb-4 mt-32 ml-16 mr-16 rounded-full"
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
        <section className="md:container max-w-screen-xl mx-auto flex flex-wrap">
          {recipes &&
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className="w-1/4 p-4 mb-4 cursor-pointer hover:bg-amber-100"
              >
                <img
                  src={recipe.image}
                  alt="Regular food"
                  className="mx-auto m-2 object-cover"
                  style={{ height: 243, width: 328 }}
                />
                <p className="mx-auto max-w-xs text-xs text-center font-bold text-amber-700">
                  {recipe.title}
                </p>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
