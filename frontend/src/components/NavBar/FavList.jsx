import React, { useState, useEffect } from "react";
import ProfileRecipes from "./ProfileRecipes";
import axios from "axios";

export default function FavList () {
  
  const [ favs, setFavs ] = useState([]);
  const jwtToken = localStorage.token;
  
  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/fav`, {
          headers: { token: jwtToken },
        });
        const allFavs = response.data;

        setFavs(allFavs);
      } catch (error) {
        console.error("Error fetching favs:", error);
      }
    };
    fetchFavs();
  }, []);

  return (
    <div>
      {favs.length < 1 ? (
        <div>
          <h1 className="font-bold text-3xl mb-8 pt-12 text-yellow text-center">No favourites added</h1>
          <p className="text-sm italic text-gray-500 text-center">Click on "Add to Favourites" on a recipe to add it to your list</p>
        </div>
      ) : (
        <div>
          <ProfileRecipes recipes={favs} />
        </div>
      )}
    </div>
  )
};