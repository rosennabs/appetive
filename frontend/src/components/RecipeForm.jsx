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
        <label htmlFor="cuisine">Cuisine</label>
        <input
          id="cuisine"
          name="cuisine"
          type="text"
        />
        <label htmlFor="diet">Diet</label>
        <input
          id="diet"
          name="diet"
          type="text"
        />
        <label htmlFor="prep_time">Prep Time</label>
        <input
          id="prep_time"
          name="prep_time"
          type="text"
        />
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
        />
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
        />

        <button className="text-white bg-black" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipeForm;