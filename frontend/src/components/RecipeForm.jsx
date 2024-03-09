import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";

function RecipeForm() {
  const emptyIngredient = {
    quantity: "",
    name: ""
  }

  // All Tailwind classNames are TEMPORARY to make the form easier to look at. All can be altered at styling stage
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
      <Field
        id="name"
        name="name"
        type="text"
        className="border"
        />
      <label className="block" htmlFor="cuisine">Cuisine</label>
      { /* to update with mock data */}
      <Field as="select" id="diet" name="diet"
      className="border">
        <option value="French">French</option>
        <option value="Jamaican">Jamaican</option>
      </Field>
      <label className="block" htmlFor="diet">Diet</label>
      { /* to update with mock data */}
      <Field as="select" id="diet" name="diet"
      className="border">
        <option value="Keto">Keto</option>
        <option value="Vegetarian">Vegetarian</option>
      </Field>
      <label className="block" htmlFor="prep_time">Prep Time</label>
      <Field
        id="prep_time"
        name="prep_time"
        type="number"
        className="border"
        /> minutes

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
                    className="border"
                  />
                  <Field
                    name={`${startName}.name`}
                    type="text"
                    placeholder="carrots"
                    className="border"
                  />
                  <button
                    type="button"
                    onClick={() => push(emptyIngredient)}
                    className="mx-1 px-2 bg-gray-200"
                  >Add</button>
                  {index > 0 && <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mx-1 px-2 bg-gray-200"
                  >Remove</button>}
                </div>
              )
            })}
          </>
        )}
      </FieldArray>

        <label className="block" htmlFor="instructions">Instructions</label>
        <Field as="textarea"
          id="instructions"
          name="instructions"
          className="border"
          />
        <label className="block" htmlFor="tags">Tags</label>
        <Field
          id="tags"
          name="tags"
          type="text"
          className="border"
          />
        <div>
          <button type="submit" className="px-2 bg-gray-200">Submit Recipe</button>
        </div>
       </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;