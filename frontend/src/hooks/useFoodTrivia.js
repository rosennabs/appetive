import { useState } from "react";
import { apiKey, host } from "../config";
import axios from "axios";

//Define state to manage food trivia
export function useFoodTrivia() {
  const [foodTrivia, setFoodTrivia] = useState("");
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

   const fetchRandomTrivia = async (knewTrivia) => {
     const options = {
       method: "GET",
       url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
       headers: {
         "X-RapidAPI-Key": apiKey,
         "X-RapidAPI-Host": host,
       },
     };

     try {
       const response = await axios.request(options);
       setFoodTrivia(response.data.text); // Store the fetched trivia in state

       if (knewTrivia !== undefined) {
         if (knewTrivia) {
           setKnownCount((prevCount) => prevCount + 1); // Increment known count
         } else {
           setUnknownCount((prevCount) => prevCount + 1); // Increment unknown count
         }
       }
     } catch (error) {
       console.error("Error fetching food trivia: ", error);
     }
   };
  
  return {
    fetchRandomTrivia,
    setFoodTrivia,
    foodTrivia,
    knownCount,
    unknownCount
  }
  
}