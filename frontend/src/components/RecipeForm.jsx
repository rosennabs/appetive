import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";

function RecipeForm() {
  const emptyIngredient = {
    measurement: "",
    name: ""
  }

  // All Tailwind classNames are TEMPORARY to make the form easier to look at. All can be altered at styling stage
  return (
    <Formik
      initialValues={{
        title: '',
        image: '',
        prep_time: 0,
        ingredients: [emptyIngredient],
        instructions: '',
        proteins: '',
        fats: '',
        carbs: '',
        number_of_servings: 0,
        calories: 0,
        created_at: undefined,
        updated_at: undefined,
        cuisine: '',
        diet: '',
        meal_type: '',
        intolerances: ''
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
    {({ values, handleChange, setFieldValue }) => (
      <Form>

      <label className="block" htmlFor="title">Recipe Title</label>
      <Field
        id="title"
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
        className="border"
        />

      <label className="block" htmlFor="cuisine">Cuisine</label>
      { /* to update with mock data */}
      <Field
        as="select"
        id="diet"
        name="diet"
        value={values.cuisine}
        onChange={handleChange}
        className="border"
      >
        <option value="French">French</option>
        <option value="Jamaican">Jamaican</option>
      </Field>

      <fieldset>
        <legend>Dietary Restrictions</legend>

        <label htmlFor="diet">Diet</label>
        { /* to update with mock data */}
        <Field
          as="select"
          id="diet"
          name="diet"
          value={values.diet}
          onChange={handleChange}
          className="border"
        >
          <option value="Keto">Keto</option>
          <option value="Vegetarian">Vegetarian</option>
        </Field>

        <label htmlFor="intolerances">Intolerances</label>
        { /* to update with mock data */}
        <Field
          as="select"
          id="intolerances"
          name="intolerances"
          value={values.intolerances}
          onChange={handleChange}
          className="border"
          >
          <option value="Dairy">Dairy</option>
          <option value="Wheat">Wheat</option>
        </Field>
      </fieldset>

      <label className="block" htmlFor="meal_type">Meal Type</label>
      { /* to update with mock data */}
      <Field
        as="select"
        id="meal_type"
        name="meal_type"
        value={values.meal_type}
        onChange={handleChange}
        className="border"
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
      </Field>

      <label className="block" htmlFor="prep_time">Prep Time</label>
      <Field
        id="prep_time"
        name="prep_time"
        type="number"
        value={values.prep_time}
        onChange={handleChange}
        className="border"
        /> minutes

      <label className="block" htmlFor="number_of_servings">Number of Servings</label>
      <Field
        id="number_of_servings"
        name="number_of_servings"
        type="number"
        value={values.number_of_servings}
        onChange={handleChange}
        className="border"
      />

      <label className="block" htmlFor="ingredients">Ingredients</label>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <>
            {values.ingredients.map((ingredient, index) => {
              const startName = `ingredients[${index.toString()}]`;

              return (
                <div key={`ingredient-${index.toString()}`}>
                  <Field
                    name={`${startName}.measurement`}
                    type="text"
                    placeholder="50g"
                    value={values.ingredients[index].measurement}
                    onChange={handleChange}
                    className="border"
                  />
                  <Field
                    name={`${startName}.name`}
                    type="text"
                    placeholder="carrots"
                    value={values.ingredients[index].name}
                    onChange={handleChange}
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
        value={values.instructions}
        onChange={handleChange}
        className="border"
      />

      <fieldset>
        <legend>Nutritional Information</legend>

        <label className="inline" htmlFor="proteins">Protein</label>
        <Field
          id="proteins"
          name="proteins"
          type="text"
          value={values.proteins}
          onChange={handleChange}
          className="border"
          />
        <label className="inline" htmlFor="fats">Fats</label>
        <Field
          id="fats"
          name="fats"
          type="text"
          value={values.fats}
          onChange={handleChange}
          className="border"
          />
        <label className="inline" htmlFor="carbs">Carbs</label>
        <Field
          id="carbs"
          name="carbs"
          type="text"
          value={values.carbs}
          onChange={handleChange}
          className="border"
          />
        
        <br />

        <label className="inline" htmlFor="calories">Calories</label>
        <Field
          id="calories"
          name="calories"
          type="number"
          value={values.calories}
          onChange={handleChange}
          className="border"
          />
      </fieldset>

      <label className="block" htmlFor="image">Upload Image</label>
      <input
        id="image"
        name="image"
        type="file"
        value={values.image}
        onChange={(event) => {
          setFieldValue("file", event.currentTarget.files[0]);
        }}
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