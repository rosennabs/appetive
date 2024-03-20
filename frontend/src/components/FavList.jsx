import React, { useState } from "react";
import RecipesList from "./RecipesList";

export default function FavList () {
  const [ favs, setFavs ] = useState([]);

  return (
    <div>
      {favs.length < 1 ? (
        <div>
          <h1 className="font-bold text-3xl mb-8  text-yellow text-center">No favourites added</h1>
          <p className="text-sm italic text-gray-500 text-center">Click on "Add to Favourites" on a recipe to add it to your list</p>
        </div>
      ) : (
        <div>
          <h1>Here be favs</h1>
        </div>
      )}
    </div>
  )
};