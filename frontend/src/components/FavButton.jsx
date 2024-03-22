import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

export default function FavButton (props) {
  const [ isFav, setIsFav ] = useState(false);
  const userToken = localStorage.token;
  const recipe_id = props.recipe_id;

  useEffect(async () => {
    const getFavStatus = async (token, recipe_id) => {
      try {
        const response = await axios.post(`http://localhost:8080/api/user/recipe/${recipe_id}`, {
          token,
          recipe_id
        });
        const favCheck = response.data;
        
        setIsFav(favCheck);
      } catch (error) {
        console.error("Error getting fav status:", error);
      }
    }
  }, []);

  const handleFavClick = async (token, recipe_id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/recipe/${recipe_id}/fav`, {
        token,
        recipe_id
      });
      
      setIsFav(response.data);
    } catch (error) {
      console.error("Error fetching favs:", error);
    }
  };

  // useEffect to check if fav on load/on click
  // function to send if fav on click
  // state for fav state
  return (
    <div>
      <section className="flex border border-black h-10 px-8 justify-center bg-yellow w-[200px]" onClick={() => {handleFavClick(userToken, recipe_id)}}>
        <p className="flex items-center">
          <FaHeart />
          <button className="ml-2">Favourite</button>
        </p>
      </section>
    {/* {!isFav && ( */}
      {/* <section className="flex border border-black h-10 px-8 justify-center w-[200px]">
      <p className="flex items-center">
        <FaHeart />
        <button className="ml-2">Add to Favourite</button>
      </p>
    </section> */}
    {/* )} */}
    </div>
  )
};