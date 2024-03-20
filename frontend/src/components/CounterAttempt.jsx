import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CounterAttempt() {
  const [toggled, setToggled] = useState(false);

  const user_id = localStorage.getItem("token");
  const { id } = useParams();

  const handleToggleBtn = async() => {
    console.log("Toggled");
    setToggled((prev) => !prev);
    try {
      const res = await axios.post(`http://localhost:8080/api/recipes/${id}`, {user_id})
      console.log("Response from toggle button", res);
    } catch (error) {
      console.error("Error from handleToggleBtn", error.message);
      throw error;
    }
  };

  return (
    <>
      {/* Hidden input to pass user_id to the server */}
      <div>
        <input name="user_id" type="hidden" value={user_id} />
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <span className="ms-3 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Have you tried this recipe?
        </span>
        <input
          type="checkbox"
          checked={toggled}
          onChange={handleToggleBtn}
          className="sr-only peer"
        ></input>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow"></div>
      </label>
    </>
  );
}

export default CounterAttempt;
