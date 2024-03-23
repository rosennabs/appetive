import React, { useEffect, useState } from 'react'
import { apiKey, host } from "../../../config";
import axios from "axios";

export default function FoodTrivia() {

  const [trivia, setTrivia] = useState('');
  
 useEffect(() => {
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
       console.log(response.data);
       setTrivia(response.data.text); // Store the fetched trivia in state
      
      
     } catch (error) {
       console.error("Error fetching trivia: ", error);
     }
   }
    fetchRandomTrivia();
  }, []);


  return (
    <div>
      <h2>
        FoodTrivia
      </h2>
      <p>{trivia}</p>
    </div>
  )
}
