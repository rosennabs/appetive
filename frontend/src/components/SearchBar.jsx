import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';
import axios from "axios";
import { apiKey, host } from "../config";

export default function SearchBar() {

  //Access recipes from state
  const { state, fetchRecipeInfo, setRecipes } = useContext(AppDataContext);
  const { recipes } = state;

  const [query, setQuery] = useState(''); //State variable to store user's recipe input
  const [suggestions, setSuggestions] = useState([]); //To store suggested possible recipe names
 
  const handleInputChange = async (event) => {
    const userInput = event.target.value
    setQuery(userInput);
   
    if (userInput.trim() !== '') {

    const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete',
    params: {
      query: userInput,
      number: '25'
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host
    }
};
      try {
        const response = await axios.request(options);
        
        setSuggestions(response.data);
        

      } catch (error) {
        console.error("Error fetching autocomplete recipe names: ", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  }


  //Handle suggestion selection by user
  const handleSuggestionClick = async(suggestion, recipeId) => {
    setQuery(suggestion);
    setSuggestions([]); //Clear suggestions after selection

    try {
      const recipeInfo = await fetchRecipeInfo(recipeId);
      setRecipes([recipeInfo]);


    } catch (error) {
    console.error("Error fetching recipe information: ", error);
  }
   
    
  }


  return (
    <Formik
      initialValues={{query: ""}}
      onSubmit={(values, actions) => {
        // Handle form submission

         //console.log("values: ", values);
        
        actions.setSubmitting(false);
      }}
      
    >
      {({ handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          
          <div className="flex justify-center items-center bg-white border border-gray-300 rounded-md shadow-lg p-16">
          
          <input
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Search recipes"
            autoComplete='off'
            aria-autocomplete='list'
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500"
            />
           </div>
          <div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-w-lg left-0 right-0 mx-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.title, suggestion.id)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.title}

                </li>
              ))}

            </ul>
              )}
              </div>
           
            
          
        </Form>
      )}
      
    </Formik>
    
  )
}
