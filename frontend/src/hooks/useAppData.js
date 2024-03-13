import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import apiKey from "../config";

// Define action types as constants
const SET_RECIPES = "SET_RECIPES";

//List of supported cuisines
const cuisine =
  "African, Asian, American, British, Cajun, Caribbean, Chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean, Latin American, Mediterranean, Mexican, Middle Eastern, Nordic, Southern, Spanish, Thai,Vietnamese";

//Initial state
export const initialState = {
  recipes: [],
  cuisine: [],
};

//Define the reducer function to update state
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPES:
  
      return {
        ...state,
        recipes: action.recipes,
      };
  }
};

const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Dispatch recipes data
  const setRecipes = (data) => {
    dispatch({
      type: SET_RECIPES,
      recipes: data,
    });
  };

  //Fetch all recipes from api on initial render
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=1&cuisine=${cuisine}`
        );

        // Create an array of promises for fetching recipe information

        const recipeInfoPromises = response.data.results.map(async (recipe) => {
          const responseWithInfo = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&instructionsRequired=true&includeNutrition=true&includeInstructions=true`
          );
          return responseWithInfo.data; //return the fetched recipe information
        });

        //Wait for all recipe information promises to resolve
        const recipeInfo = await Promise.all(recipeInfoPromises);

        // Set the fetched recipes with information in state
        setRecipes(recipeInfo);
        // console.log("This is recipe info: ", recipeInfo);

      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []); 

  

  // // Function to handle search form submission and make API call
  const handleSearchSubmission = async (values) => {

    // Store selected options for each category. Convert minCalories and maxCalories to arrays with a single element

    const selectedOptions = {
      cuisine: values.cuisine,
      type: values.type,
      diet: values.diet.join("|"),
      intolerances: values.intolerances.join(","),
      minCalories: values.minCalories !== "" ? [values.minCalories] : [],
      maxCalories: values.maxCalories !== "" ? [values.maxCalories] : [],
    };

    // Remove categories with no selected options from the selectedOptions object
    Object.keys(selectedOptions).forEach((key) => {
      if (selectedOptions[key].length === 0) {
        delete selectedOptions[key];
      }
    });

    try {
      const url =
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=1` +
        // Construct the API call URL dynamically based on selected options
        Object.entries(selectedOptions)
          .map(([key, value]) => {
            // Check if the value contains a space
            const encodedValue = value.includes(" ")
              ? encodeURIComponent(value)
              : value;
            return `&${key}=${encodedValue}`;
          })
          .join("");

      const response = await axios.get(url);

      // console.log(response.data.results);
      dispatch({ type: SET_RECIPES, recipes: response.data.results });
    } catch (error) {
      console.error("Error fetching filtered recipes: ", error);
    }
  };
  return {
    state,
    handleSearchSubmission,
  };
};

export default useAppData;
