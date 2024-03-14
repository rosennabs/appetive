import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';
import axios from "axios";
import apiKey from "../config";

export default function SearchBar() {
  const [query, setQuery] = useState(''); //State variable to store user's recipe input
  const [suggestions, setSuggestions] = useState([]); //To store suggested possible recipe names


  //Set state with user's input
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    //console.log("User's input: ", userInput);
    setQuery(userInput);
  }

  //Handle suggestion selection by user
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); //Clear suggestions after selection
  }


  //Fetch autocomplete suggestions base on user's input
  useEffect(() => {
    let isMounted = true;

    const fetchAutoComplete = async () => {
      try {
        if (query.trim() !== '' && isMounted) {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&number=1&query=${query}`
          );

          console.log("Autocomplete recipe names: ", response.data);
          setSuggestions(response.data);

        } else {
          setSuggestions([]); // Clear suggestions if query is empty
        }

  } catch (error) {
        console.error("Error fetching autocomplete recipe names: ", error);
      }
    };
    
    fetchAutoComplete()
    
    // Cleanup function to set isMounted to false when component unmounts
  return () => {
    isMounted = false;
  };
    
  }, [query]); //Trigger effect when query changes


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
          <div flex justify-center items-center>
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
                  onClick={() => handleSuggestionClick(suggestion.title)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.title}

                </li>
              ))}

            </ul>
              )}
              </div>
            </div>
            
          
        </Form>
      )}
      
    </Formik>
    
  )
}
