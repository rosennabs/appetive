import { useEffect, useReducer } from "react";
import axios from "axios";


// Define action types as constants
const SET_MEAL_CATEGORIES = "SET_MEAL_CATEGORIES";


//Initial state
export const initialState = {
  mealCategories: [],
};

//Define the reducer function to update state
export const reducer = (state, action) => {
 
    switch (action.type) {
      case SET_MEAL_CATEGORIES:
      
        return {
          ...state,
          mealCategories: action.mealCategories,
        };
    }
  };

const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
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

        //console.log("Meal Categories: ", response.data.categories);
        setMealCategories(response.data.categories);
      } catch (error) {
        console.error("Error fatching meal categories: ", error);
      }
    };
    fetchCategories();
  }, [dispatch]); //Ensure the latest dispatch function is used to update the state.

  return {
    state
  };
};



export default useAppData;