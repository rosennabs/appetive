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

    try {
      recipeId >= 5 &&
        (response = await axios.request(options));
      
      recipeId < 5 &&
        (response = await axios.get(
          `http://localhost:8080/api/recipes/${recipeId}`
        ));
      
      
      const recipeInfo = response.data;

      // Extract only necessary information from each recipe
      const extractedRecipeInfo = {
        id: recipeInfo.id,
        title: recipeInfo.title,
        image: recipeInfo.image,
        cuisines: recipeInfo.cuisines,
        diets: recipeInfo.diets,
        type: recipeInfo.dishTypes,
        servings: recipeInfo.servings,
        readyInMinutes: recipeInfo.readyInMinutes,
        ingredients: recipeInfo.extendedIngredients,
        nutrients: recipeInfo.nutrition.nutrients,
        instructions: recipeInfo.instructions,
        sourceName: recipeInfo.sourceName
      };
      // console.log("Extracted recipes: ", extractedRecipeInfo);
      return extractedRecipeInfo;
    }
    catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  }
                  

  //Fetch all recipes from api on initial render
  useEffect(() => {
  
    const fetchRecipes = async () => {
      const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host
        },
      };

      try {
        const response = await axios.request(options);
        // console.log("New api response: ", response.data.results);

        // Create an array of promises for fetching recipe information

        const recipeInfoPromises = response.data.results.map(async (recipe) =>
          fetchRecipeInfo(recipe.id)
        );

        //Wait for all recipe information promises to resolve
        const recipes = await Promise.all(recipeInfoPromises);

        setRecipes(recipes);

        //Fetch all user's stored recipes from the database
        const fetchDatabaseRecipes = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/api/recipes"
            );

            const dbRecipesPromises = response.data.map(async (recipe) => {
              fetchRecipeInfo(recipe.id);
            }
              
            );

            
            //Wait for all recipe information promises to resolve
            const databaseRecipes = await Promise.all(dbRecipesPromises);

            // console.log("Database recipes: ", databaseRecipes);

            // Set the fetched recipes with information in state
            // setRecipes((prev) => {
            //   return [...prev, databaseRecipes];
            // });
          } catch (error) {
            console.error("Error fetching recipes from database: ", error);
          }
        };
        
        // Await fetching of database recipes before setting state
        await fetchDatabaseRecipes();

        // console.log("This is all recipe info: ", recipes);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []);


  // Function to handle search form submission and make API call
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

    
      const url =
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=2` +
       
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
    
    // const options = {
    //   method: "GET",
    //   url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${}/information",
    //   headers: {
    //     "X-RapidAPI-Key": "apiKey",
    //     "X-RapidAPI-Host": host,
    //   },
    // };
      try {
        const response = await axios.get(url);

        const filteredRecipes = await Promise.all(
          response.data.results.map((recipe) => fetchRecipeInfo(recipe.id))
        );

        // console.log("Filtered Results: ", filteredRecipes);
        setRecipes(filteredRecipes);

      } catch (error) {
        console.error("Error fetching filtered recipes: ", error);
      }
  };
  return {
    state,
    handleSearchSubmission,
    fetchRecipeInfo,
    setRecipes
  };
};

export default useAppData;
