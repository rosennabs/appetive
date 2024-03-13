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
      console.log("New recipes: ", action.recipes);
      return {
        ...state,
        recipes: action.recipes,
      };
  }
};

const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recipeInfoFetched, setRecipeInfoFetched] = useState(false);

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

        // Set recipes data in state
        setRecipes(response.data.results);
        // Set recipe info fetched to false when new recipes are fetched
        setRecipeInfoFetched(false);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []); 

  // Fetch recipe information for each recipe rendered
  useEffect(() => {
    const fetchRecipeInfo = async () => {
      if (state.recipes.length === 0 || recipeInfoFetched) {
        // If no recipes or recipe info already fetched, return
        return;
      }

      try {
        const updatedRecipes = await Promise.all(
          state.recipes.map(async (recipe) => {
            // Fetch recipe information for the current recipe using id
            const response = await axios.get(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&instructionsRequired=true&includeNutrition=true&includeInstructions=true`
            );

            // Add recipe information to the current recipe
            return {
              ...recipe,
              information: response.data,
            };
          })
        );

        //Update recipes in state with recipe information
        setRecipes(updatedRecipes);

        // Set recipe info fetched to true after fetching recipe info for all recipes
        setRecipeInfoFetched(true);
      } catch (error) {
        console.error("Error fetching recipe information: ", error);
      }
    };

    // Fetch recipe information from api when state.recipes changes
    fetchRecipeInfo();
  }, [state.recipes, recipeInfoFetched]); //execute when state.recipes or recipeInfoFetched changes

  // // Function to handle search form submission and make API call
  const handleSearchSubmission = async (values) => {

    // Store selected options for each category
    const selectedOptions = {
      cuisine: values.cuisine,
      type: values.type,
      diet: values.diet.join("|"),
      intolerances: values.intolerances.join(","),
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

      //console.log("Request URL:", url);

      const response = await axios.get(url);

      //console.log(response.data.results);
      dispatch({ type: SET_RECIPES, recipes: response.data.results });

      setRecipeInfoFetched(false);
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
