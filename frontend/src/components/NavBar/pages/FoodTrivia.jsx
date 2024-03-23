import React, { useState } from 'react'
import { apiKey, host } from "../../../config";
import axios from "axios";
import TriviaGame from './TriviaGame';

export default function FoodTrivia() {

  const [trivia, setTrivia] = useState('');
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  
 
   const fetchRandomTrivia = async (knewTrivia) => {
      
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
      
       if (knewTrivia !== undefined) {
         if (knewTrivia) {
           setKnownCount((prevCount) => prevCount + 1); // Increment known count
         } else {
           setUnknownCount((prevCount) => prevCount + 1); // Increment unknown count
         }
       }
      
     } catch (error) {
       console.error("Error fetching trivia: ", error);
     }

     
   }
  
 
  return (
    <div className="font-bold text-amber-700 text-center">
      <h2 className="font-bold text-5xl my-16 uppercase  text-amber-700 text-center">
        Welcome to Food Trivia
      </h2>
      <p className='text-3xl mb-16'>Are you ready to challenge your culinary knowledge?</p>
      <p className='text-xl mb-16'>Start the fun and see how many trivia facts you know!</p>

      <button onClick={()=> fetchRandomTrivia()} type="button" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-16 rounded-md text-3xl">START</button>
  
        {
    trivia &&
        <TriviaGame
          trivia={trivia}
          fetchRandomTrivia={fetchRandomTrivia}
          knownCount={knownCount}
          unknownCount={unknownCount}/>
  
  }
    </div>
    
  )
}
