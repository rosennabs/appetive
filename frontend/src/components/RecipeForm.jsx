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

        <label htmlFor="ingredient">Ingredients</label>
        {/* For ingredients: each input has a quantity + type of measurement dropdown + ingredient */}
        {/* quantity (number input) */}
        <input name="quantity" type="number" />
        {/* measurement (select) */}
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
        {/* ingredient (text) */}
        <input name="ingredient" placeholder="Ingredient name" type="text"/>
        <button onClick={() => {}}>+</button> {/* for adding new ingredient input */}

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