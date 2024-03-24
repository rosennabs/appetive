import React, { useState, useEffect } from "react";
import ProfileRecipes from "./ProfileRecipes";
import axios from "axios";

export default function UserRecipesList () {
  
  const [ recipes, setRecipes ] = useState([]);
  const jwtToken = localStorage.token;
  
  useEffect(() => {
    const fetchRecipes = async (token) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/recipe`, {
          headers: { token: jwtToken }
        });
        const allRecipes = response.data;

        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching favs:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.length < 1 ? (
        <div>
          <h1 className="font-bold text-3xl mb-8  text-yellow text-center">No recipes created</h1>
          <p className="text-sm italic text-gray-500 text-center">Click on "Make Your Recipe" to create a new recipe</p>
        </div>
      ) : (
        <div>
          <ProfileRecipes recipes={recipes} />
        </div>
      )}
    </div>
  )
};