import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function FavButton () {
  const [ isFav, setIsFav ] = useState(false);
  const userToken = localStorage.token;

  useEffect(() => {
  const handleFavClick = async (token, recipe_id, fav) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/fav`, { token });
      const allFavs = response.data;

      setFavs(allFavs);
    } catch (error) {
      console.error("Error fetching favs:", error);
    }
  };
    fetchFavs(userToken);
  }, []);

  // useEffect to check if fav on load/on click
  // function to send if fav on click
  // state for fav state
  return (
    <div>
      <section className="flex border border-black h-10 px-8 justify-center bg-yellow w-[200px]">
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