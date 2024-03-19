import React, { useState } from "react";
import RecipesList from "./RecipesList";

export default function FavList () {
  const [ favs, setFavs ] = useState([]);

  return (
    <div>
      {favs.length < 1 ? (
        <h1 className="font-bold text-3xl mb-8  text-yellow text-center"> No results found! </h1>
      ) : (
        <h1>Here be favs</h1>
      )}
    </div>
  )
};