import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";

function RecipeForm() {
  const emptyIngredient = {
    quantity: "",
    name: ""
  }

  return (
    <Formik
      initialValues={{
        ingredients: [emptyIngredient]
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
    {({ values }) => (
     <Form>
      <label className="block" htmlFor="name">Recipe Name</label>
      <input
        id="name"
        name="name"
        type="text"
        className="border"
        />
      <label className="block" htmlFor="cuisine">Cuisine</label>
      { /* to update with mock data */}
      <select id="diet" name="diet"
      className="border">
        <option value="French">French</option>
        <option value="Jamaican">Jamaican</option>
      </select>
      <label className="block" htmlFor="diet">Diet</label>
      { /* to update with mock data */}
      <select id="diet" name="diet"
      className="border">
        <option value="Keto">Keto</option>
        <option value="Vegetarian">Vegetarian</option>
      </select>
      <label className="block" htmlFor="prep_time">Prep Time</label>
      <input
        id="prep_time"
        name="prep_time"
        type="text"
        className="border"
        />

      <label className="block" htmlFor="ingredients">Ingredients</label>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <>
            {values.ingredients.map((_ingredient, index) => {
              const startName = `ingredient[${index.toString()}]`;

              return (
                <div key={`ingredient-${index.toString()}`}>
                  <Field
                    name={`${startName}.quantity`}
                    type="text"
                    placeholder="50g"
                  />
                  <Field
                    name={`${startName}.name`}
                    type="text"
                    placeholder="carrots"
                  />
                  <button
                    type="button"
                    onClick={() => push(emptyIngredient)}
                  >Add</button>
                  {index > 0 && <button
                    type="button"
                    onClick={() => remove(index)}
                  >Remove</button>}
                </div>
              )
            })}
          </>
        )}
      </FieldArray>

        <label className="block" htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          className="border"
          />
        <label className="block" htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="border"
          />
        <div>
          <button type="submit">Submit Recipe</button>
        </div>
       </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;