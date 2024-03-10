import React, { useContext } from 'react';
import { AppDataContext } from '../contexts/AppDataContext'; 

export default function Recipe() {

  //Access recipes from state
  const { state } = useContext(AppDataContext);
  const { recipes } = state;
  console.log(recipes);

  return (
    <div>
      <h2 className="border-b-2 border-black text-center uppercase text-xl font-bold mb-4 pb-2">
        Recipes
      </h2>

      <section className="md:container max-w-screen-xl mx-auto flex flex-wrap justify-between">
        {recipes && recipes.map(recipe => (
          
          <div key={recipe.id} className="w-1/3 p-4 mb-4">

            <img src={recipe.image} alt="Regular food" className="mx-auto m-2 w-full h-64 object-cover" />
            <p className="mx-auto max-w-xs uppercase font-bold text-amber-700">{recipe.title}</p>
            
            {recipe.information && <a className="uppercase font-serif text-xs hover:text-amber-700" href={recipe.information.sourceUrl}> {recipe.information.creditsText} </a>}
            
            

          </div>
        ))}

      </section>
    </div>
  )
}
