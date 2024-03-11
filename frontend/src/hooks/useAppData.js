import { useEffect, useState, useReducer } from "react";
import axios from "axios";


// Define action types as constants
const SET_RECIPES = "SET_RECIPES";

//List of supported cuisines
const cuisines = "African, Asian, American, British, Cajun, Caribbean, Chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean"

//Initial state
export const initialState = {
  recipes: [],
  cuisines: []
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
  const[recipeInfoFetched, setRecipeInfoFetched] = useState(false);

  //Dispatch recipes data
  const setRecipes = (data) => {
    dispatch({
      type: SET_RECIPES,
      recipes: data,
    });
  };

  //Fetch all recipes from api
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch?apiKey=e2618c54ce47421791292129bc572c06&number=3"
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
  }, [dispatch]); //Ensure the latest dispatch function is used to update the state.



  useEffect(() => {
    const fetchRecipeInfo = async () => {
      if (state.recipes.length === 0 || recipeInfoFetched) {
        // If no recipes or recipe info already fetched, return
        return;
      }

      try {
        // Fetch recipe information for each recipe in state.recipes
        const updatedRecipes = await Promise.all(
          state.recipes.map(async (recipe) => {

            // Fetch recipe information for the current recipe using id
            const response = await axios.get(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e2618c54ce47421791292129bc572c06&instructionsRequired=true&includeNutrition=true&includeInstructions=true`
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
  }, [state.recipes,recipeInfoFetched]); //execute when state.recipes or recipeInfoFetched changes


  return {
    state,
  };
};

export default useAppData;
