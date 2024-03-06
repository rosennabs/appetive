import React from "react";
import { useFormik } from "formik";

function RecipeForm() {

  return (
    <div>
      <form onSubmit={(event) => {event.preventDefault()}}>
        <label htmlFor="name">Recipe Name</label>
        <input
          id="name"
          name="name"
          type="text"
        />
        <button className="text-white bg-black" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipeForm;