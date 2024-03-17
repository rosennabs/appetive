import React, { useContext, useState } from 'react';
import { AppDataContext } from '../contexts/AppDataContext';
import RecipeDetails from './RecipeDetails';

export default function Recipe() {

  //Access recipes from state
  const { state, fetchRecipeInfo } = useContext(AppDataContext);
  const { recipes } = state;
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //Function to handle click on a recipe
  const handleRecipeClick = async (recipeId) => {
    const recipeInfo = await fetchRecipeInfo(recipeId);
    setSelectedRecipe(recipeInfo); //Set selected recipe details in state
    console.log("Recipe Information: ", recipeInfo);
  }
  

  return (
    <div>
      {recipes.length === 0 ? (
        <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center"> No results found! </h1>
      ) : (  

      <section className="md:container max-w-screen-xl mx-auto flex flex-wrap justify-between">
          {recipes && recipes.map(recipe => (
          
          <div key={recipe.id} onClick={()=>handleRecipeClick(recipe.id)} className="w-1/4 p-4 mb-4">

            <img src={recipe.image} alt="Regular food" className="mx-auto m-2 w-full h-38 object-cover" />
            <p className="mx-auto max-w-xs text-xs text-center font-bold text-amber-700">{recipe.title}</p>
            
          </div>
        ))}

          </section>
      )} 
      {/* Conditionally render RecipeDetails component*/}
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe}/>}
    </div>
  )
}
