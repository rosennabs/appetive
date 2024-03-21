import React from "react";
import { FaHeart } from "react-icons/fa";

export default function FavButton () {
  return (
    <section className="flex border border-black h-10 px-8 items-center">
      <p className="flex items-center">
        <FaHeart />
        <button className="ml-2">Add to Favourite</button>
      </p>
    </section>
  )
};