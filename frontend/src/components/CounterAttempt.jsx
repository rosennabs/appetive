import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

function CounterAttempt({ recipeId }) {
  const [isToggled, setToggled] = useState(false);
  const jwtToken = localStorage.token;

  useEffect(() => {
    const fetchUserRecipeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recipes/userRecipeData/${recipeId}`, {
          headers: {'token': jwtToken }
        });
        const userRecipeData = response.data;
        if (userRecipeData && userRecipeData.has_tried) {
          setToggled(userRecipeData.has_tried); // Set initial value based on fetched data
        }
      } catch (error) {
        console.error('Error fetching user recipe data:', error.message);
      }
    };

    fetchUserRecipeData();
  }, []);


const handleToggleButton = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/recipes/${recipeId}`, null, {
        headers: {'token': jwtToken }
      });
      const results = res.data;
      setToggled(prev => !prev)
      return res.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-black">
          Have you tried this recipe?
        </span>
        <input
          type="checkbox"
          checked={isToggled}
          onChange={handleToggleButton}
          className="sr-only peer"
        ></input>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow"></div>
      </label>
    </>
  );
}

export default CounterAttempt;
