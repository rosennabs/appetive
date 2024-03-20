import React, { useState, useEffect } from "react";
import Fav from "./Favs";
import axios from "axios";

export default function FavList () {
  
  const [ favs, setFavs ] = useState([]);
  
  useEffect(() => {
    const fetchFavs = async (user_id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/${user_id}/fav`);
        const allFavs = response.data;

        setFavs(allFavs);
      } catch (error) {
        console.error("Error fetching favs:", error);
      }
    };
    fetchFavs('3b1ef871-6c1e-4a0e-9e17-6d1be6e37259');
  }, []);

  return (
    <div>
      {favs.length < 1 ? (
        <div>
          <h1 className="font-bold text-3xl mb-8  text-yellow text-center">No favourites added</h1>
          <p className="text-sm italic text-gray-500 text-center">Click on "Add to Favourites" on a recipe to add it to your list</p>
        </div>
      ) : (
        <div>
          <Fav favs={favs} />
        </div>
      )}
    </div>
  )
};