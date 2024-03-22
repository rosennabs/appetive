import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { apiKey, host } from "../config";

// Define action types as constants
const SET_RECIPES = "SET_RECIPES";

//Initial state
export const initialState = {
  recipes: [],
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

  const fetchRecipeInfo = async (recipeId) => {
    try {
      let response;

      const options = {
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        params: {
          includeNutrition: "true",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host,
        },
      };

      // Make the API request
      if (recipeId >= 5) {
        response = await axios.request(options);
      } else {
        response = await axios.get(
          `http://localhost:8080/api/recipes/${recipeId}`
        );
      }

      const recipe = response.data;
      // Extract only necessary information from each recipe

      const extractedRecipeInfo = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        cuisines: recipe.cuisines,
        diets: recipe.diets,
        type: recipe.dishTypes,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        ingredients: recipe.extendedIngredients,
        nutrients: recipe.nutrition.nutrients,
        instructions: recipe.instructions,
        sourceName: recipe.sourceName,
        sourceUrl: recipe.sourceUrl,
      };
      // console.log("Extracted Recipe Info: ", extractedRecipeInfo);
      return extractedRecipeInfo;
    } catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  };

  //Fetch all recipes from api on initial render
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes from backend route
        const response = await axios.get("http://localhost:8080/api/recipes");
        const allRecipes = response.data;

        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []);

  // Function to handle search form submission
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearchSubmission = async (values) => {
    // Store user's selected options
    setSearchClicked(true);

    const selectedOptions = {
      query: values.title,
      cuisine: values.cuisine,
      type: values.type,
      diet: values.diet ? values.diet.join(",") : "", // Check if values.diet is defined
      intolerances: values.intolerances ? values.intolerances.join(",") : "", 
      minCalories: values.minCalories,
      maxCalories: values.maxCalories,
    };

    // Remove keys with empty values
    const filteredOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([key, value]) => value !== "")
    );
    console.log("Filter: ", filteredOptions);

    try {
      // Fetch search results from backend route
      const dbResponse = await axios.post(
        "http://localhost:8080/api/recipes/search",
        null,
        { params: filteredOptions }
      );

      const searchResponse = dbResponse.data;
      console.log("ALL SEARCH RESPONSE", searchResponse);
      setRecipes(searchResponse);
    } catch (error) {
      console.error("Error fetching filtered recipes: ", error);
    }
  };
  return {
    state,
    handleSearchSubmission,
    fetchRecipeInfo,
    setRecipes,
    searchClicked,
  };
};

export default useAppData;
