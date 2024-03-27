import React, { useContext } from "react";
import { AppDataContext } from "../../contexts/AppDataContext";
import { useSelectedRecipe } from "../../hooks/useSelectedRecipe";
import useShareLink from "../../hooks/useShareLink";
import RecipeDetails from "../RecipeDetails";

export default function ProfileRecipes(props) {
  // Access recipes
  const { fetchRecipeInfo } = useContext(AppDataContext);
  const { selectedRecipe, setSelected } = useSelectedRecipe();
  const { shareLink, generateShareLink, copySuccess, setCopySuccess } =
    useShareLink();
  const recipes = props.recipes;

  //Function to handle click on a recipe
  const handleRecipeClick = async (recipeId) => {
    const recipeInfo = await fetchRecipeInfo(recipeId);
    setSelected(recipeInfo); //Set selected recipe details in state
  };

  return (
    <div>
      {selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          setSelected={setSelected}
          shareLink={shareLink}
          generateShareLink={generateShareLink}
          copySuccess={copySuccess}
          setCopySuccess={setCopySuccess}
        />
      ) : (
        <section className="md:container max-w-screen-xl mx-auto flex flex-wrap">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              className="w-1/4 p-4 mb-4 cursor-pointer hover:bg-amber-100"
            >
              <img
                src={recipe.image}
                alt="Regular food"
                className="mx-auto m-2 w-full h-38 object-cover"
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
