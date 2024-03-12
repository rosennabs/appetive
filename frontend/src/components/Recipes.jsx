import React, { useContext } from 'react';
import { AppDataContext } from '../contexts/AppDataContext'; 

export default function Recipe() {

  //Access recipes from state
  const { state } = useContext(AppDataContext);
  const { recipes } = state;
  //console.log(recipes);

  return (
    <div>

      <section className="md:container max-w-screen-xl mx-auto flex flex-wrap justify-between">
        {recipes && recipes.map(recipe => (
          
          <div key={recipe.id} className="w-1/4 p-4 mb-4">

            <img src={recipe.image} alt="Regular food" className="mx-auto m-2 w-full h-38 object-cover" />
            <p className="mx-auto max-w-xs text-xs text-center font-bold text-amber-700">{recipe.title}</p>
{/*             
            {recipe.information && <a className="uppercase font-serif text-center text-xs text-gray-500 hover:text-amber-700" href={recipe.information.sourceUrl}> {recipe.information.creditsText} </a>} */}
            
            

          </div>
        ))}

      </section>
    </div>
  )
}
