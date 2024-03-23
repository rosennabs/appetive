import React, { useState } from 'react'
import { apiKey, host } from "../../../config";
import axios from "axios";

export default function FoodTrivia() {

  const [trivia, setTrivia] = useState('');
  
 
   const fetchRandomTrivia = async () => {
      
     const options = {
       method: "GET",
       url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
       headers: {
         "X-RapidAPI-Key": apiKey,
         "X-RapidAPI-Host": host,
       },
     };

     try {
       const response = await axios.request(options);
       setTrivia(response.data.text); // Store the fetched trivia in state
      
      
     } catch (error) {
       console.error("Error fetching trivia: ", error);
     }

     return (
       <div>
         <p> {trivia} </p>
         <button type="button" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-16 rounded-md text-3xl">Totally knew that!</button>
         <button type="button" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-16 rounded-md text-3xl">Never heard that!</button>
       </div>
     )
   }
  
 
 

  return (
    <div className="font-bold text-amber-700 text-center">
      <h2 className="font-bold text-5xl my-16 uppercase  text-amber-700 text-center">
        Welcome to Food Trivia
      </h2>
      <p className='text-3xl mb-16'>Are you ready to challenge your culinary knowledge?</p>
      <p className='text-xl mb-16'>Start the fun and see how many trivia facts you know!</p>

      <button onClick={()=> fetchRandomTrivia()} type="button" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-16 rounded-md text-3xl">START</button>
    </div>
  )
}
