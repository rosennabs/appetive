import { useState, useEffect, useReducer } from "react";
import axios from "axios";


// Define action types as constants
const SET_MEAL_CATEGORIES = "SET_MEAL_CATEGORIES";

//Initial state
const useAppData = () => {
  const initialState = {
    mealCategories: [],
  };

  //Dispatch meal categories data
  const setMealCategories = (data) => {
    dispatch({
      type: SET_MEAL_CATEGORIES,
      mealCategories: data,
    });
  };

  //Fetch all meal categories from api
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        console.log("Meal Categories: ", response.data.categories);

        setMealCategories(response.data.categories);
      } catch (error) {
        console.error("Error fatching meal categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  //Update state using the reduce function
  const reduce = (state, action) => {
    switch (action.type) {
      case SET_MEAL_CATEGORIES:
        return {
          ...state,
          mealCategories: action.mealCategories,
        };
    }
  };

  //State management
  const [state, dispatch] = useReducer(reduce, initialState);

  return {
    state,
  };
};



export default useAppData;