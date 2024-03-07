import React from "react";
import { useFormik } from "formik";

function RecipeForm() {

  return (
    <div>
      <form className="w-full max-w-lg" onSubmit={(event) => {event.preventDefault()}}>
        <div className="flex flex-wrap">
          <div className="w-full">
            <label className="block" htmlFor="name">Recipe Name</label>
            <input
              id="name"
              name="name"
              type="text"
              />
          </div>
          <div className="w-full">
            <label className="block" htmlFor="cuisine">Cuisine</label>
            { /* to update with mock data */}
            <select id="diet" name="diet">
              <option value="French">French</option>
              <option value="Jamaican">Jamaican</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block" htmlFor="diet">Diet</label>
            { /* to update with mock data */}
            <select id="diet" name="diet">
              <option value="Keto">Keto</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
          </div>
          <div className="w-full">
          <label className="block" htmlFor="prep_time">Prep Time</label>
          <input
            id="prep_time"
            name="prep_time"
            type="text"
            />
          </div>

          <div className="w-full">
            <label className="block" htmlFor="ingredient">Ingredients</label>
            <input name="measurement" placeholder="Measurement e.g. 50g" type="text" />
            <input name="ingredient" placeholder="Ingredient name" type="text"/>
            <button onClick={() => {}}>+</button> {/* for adding new ingredient input */}
          </div>

          <div className="w-full">
            <label className="block" htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              className="w-full"
              />
          </div>
          <div className="w-full">
          <label className="block" htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            />
          </div>

          <button className="text-white bg-black" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;