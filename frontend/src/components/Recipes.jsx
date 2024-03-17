import React, { useContext} from 'react';
import { AppDataContext } from '../contexts/AppDataContext';


export default function Recipe({setSelected}) {

  //Access recipes from state
  const { state, fetchRecipeInfo } = useContext(AppDataContext);
  const { recipes } = state;
  

  //Function to handle click on a recipe
  const handleRecipeClick = async (recipeId) => {
    const recipeInfo = await fetchRecipeInfo(recipeId);
    setSelected(recipeInfo); //Set selected recipe details in state
    
  }
  

  return (
    <div>
      <h1 className='text-l mb-4 mt-32 ml-16 uppercase font-serif text-gray-500'> Make Yourself A Treat</h1>

      {recipes.length === 0 ? (
        <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center"> No results found! </h1>
      ) : (  

      <section className="md:container max-w-screen-xl mx-auto flex flex-wrap">
          {recipes && recipes.map(recipe => (
          
          <div key={recipe.id} onClick={()=>handleRecipeClick(recipe.id)} className="w-1/4 p-4 mb-4 cursor-pointer hover:bg-amber-100">

            <img src={recipe.image} alt="Regular food" className="mx-auto m-2 w-full h-38 object-cover" />
            <p className="mx-auto max-w-xs text-xs text-center font-bold text-amber-700">{recipe.title}</p>
            
          </div>
        ))}

          </section>
      )} 
      
    </div>
  )
}
