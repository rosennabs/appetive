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
    const fetchAutoComplete = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&number=2&query=${query}`
        );

        console.log("Autocomplete recipe names: ", response.data);
        setSuggestions(response.data);

  } catch (error) {
        console.error("Error fetching autocomplete recipe names: ", error);
      }
    };
    fetchAutoComplete();
  }, []); 


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
            
          
        </Form>
      )}

      

      
    </Formik>
    
  )
}
