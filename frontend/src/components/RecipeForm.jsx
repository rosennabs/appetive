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
            <input
              id="cuisine"
              name="cuisine"
              type="text"
              />
          </div>
          <div className="w-full">
            <label className="block" htmlFor="diet">Diet</label>
            <input
              id="diet"
              name="diet"
              type="text"
              />
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
            <input name="quantity" type="number" />
            <select name="measurement">
              <option value="whole"></option>
              <option value="teaspoon">tsp</option>
              <option value="tablespoon">tbsp</option>
              <option value="cup">cup</option>
              <option value="ounces">oz</option>
              <option value="pounds">lbs</option>
              <option value="grams">grams</option>
              <option value="kilograms">kilograms</option>
            </select>
            <input name="ingredient" placeholder="Ingredient name" type="text"/>
            <button onClick={() => {}}>+</button> {/* for adding new ingredient input */}
          </div>

          <div className="w-full">
            <label className="block" htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
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