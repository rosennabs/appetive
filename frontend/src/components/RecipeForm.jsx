import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import axios from "axios";

const cuisine = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean','Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

const diet = ['Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];

const type = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];

function RecipeForm() {
  const emptyIngredient = {
    measurement: "",
    name: "",
  };

  // All Tailwind classNames are TEMPORARY to make the form easier to look at. All can be altered at styling stage
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-4xl pt-10 font-bold mx-auto text-center">
        Make Your Own Recipe
      </h1>
      <h1 className="text-yellow text-xl pt-3 pb-10 mx-auto text-center">
        Craft Your Culinary Masterpiece with Us
      </h1>

      <h6 className="text-xs italic text-gray-500">* Required</h6>
      <Formik
        initialValues={{
          ingredients: [emptyIngredient],
          cuisine: "African",
          diet: "",
          meal_type: "main course",
          intolerances: "",
          user_id: localStorage.getItem("token"),
          title: "",
          image: "",
          prep_time: 0,
          instructions: "",
          proteins: "",
          fats: "",
          carbs: "",
          number_of_servings: 0,
          calories: 0,
          created_at: 0,
          updated_at: 0,
        }}
        onSubmit={(values) => {
          axios.post("http://localhost:8080/api/recipes/", values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="my-5">
            <label className="block font-bold text-amber-700 text-lg" htmlFor="title">Recipe Title*</label>
            <Field
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500 my-1"
              />
            </div>
            <div className="flex justify-between my-5">
              <div className="basis-1/2 space-x-1">
                <label className="block font-bold text-amber-700 text-lg" htmlFor="cuisine">Cuisine*</label>
                <Field
                  as="select"
                  id="cuisine"
                  name="cuisine"
                  value={values.cuisine}
                  onChange={handleChange}
                  className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  >
                  {cuisine.map((cuisineName, index) => <option key={`cuisine-${index}`} value={cuisineName}>{cuisineName}</option>)}
                </Field>
              </div>
              <div className="basis-1/2 space-x-1">
                <label className="block font-bold text-amber-700 text-lg" htmlFor="meal_type">Meal Type*</label>
                <Field
                  as="select"
                  id="meal_type"
                  name="meal_type"
                  value={values.meal_type}
                  onChange={handleChange}
                  className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                >
                  {type.map((typeName, index) => <option key={`type-${index}`} value={typeName}>{typeName}</option>)}
                </Field>
              </div>
            </div>
            <fieldset className="my-5">
              <legend className="font-bold text-amber-700 text-lg">Dietary Restrictions</legend>
              <div className="flex justify-between my-1">
                <div className="basis-1/2 space-x-1">
                  <label className="block" htmlFor="diet">Diet</label>
                  <Field
                    as="select"
                    id="diet"
                    name="diet"
                    value={values.diet}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                    >
                    <option value="">None</option>
                    {diet.map((dietName, index) => <option key={`diet-${index}`} value={dietName}>{dietName}</option>)}
                  </Field>
                </div>
                <div className="basis-1/2 space-x-1">
                  <label className="block" htmlFor="intolerances">Intolerances</label>
                  <Field
                    as="select"
                    id="intolerances"
                    name="intolerances"
                    value={values.intolerances}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                    >
                    <option value="">None</option>
                    {intolerances.map((intoleranceName, index) => <option key={`intolerance-${index}`} value={intoleranceName}>{intoleranceName}</option>)}
                  </Field>
                </div>
              </div>
            </fieldset>
            <div className="flex justify-between my-5">
              <div className="basis-1/2 space-x-1">
                <label className="block font-bold text-amber-700 text-lg" htmlFor="prep_time">Prep Time*</label>
                <Field
                  id="prep_time"
                  name="prep_time"
                  type="number"
                  value={values.prep_time}
                  onChange={handleChange}
                  className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />{" "}
                minutes
              </div>
              <div className="basis-1/2 space-x-1">
                <label className="block font-bold text-amber-700 text-lg" htmlFor="number_of_servings">Number of Servings*</label>
                <Field
                  id="number_of_servings"
                  name="number_of_servings"
                  type="number"
                  value={values.number_of_servings}
                  onChange={handleChange}
                  className="w-48 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />
              </div>
            </div>
            <fieldset className="my-5">
              <label className="block font-bold text-amber-700 text-lg" htmlFor="ingredients">Ingredients*</label>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => {
                      const startName = `ingredients[${index.toString()}]`;
                      
                      return (
                        <div className="flex space-x-1 my-1" key={`ingredient-${index.toString()}`}>
                          <Field
                            name={`${startName}.measurement`}
                            type="text"
                            placeholder="50g"
                            value={values.ingredients[index].measurement}
                            onChange={handleChange}
                            className="w-1/6 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                            />
                          <Field
                            name={`${startName}.name`}
                            type="text"
                            placeholder="carrots"
                            value={values.ingredients[index].name}
                            onChange={handleChange}
                            className="w-4/6 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                            />
                          {index > 0 ? (
                            <button
                            type="button"
                            onClick={() => remove(index)}
                            className="w-1/6 bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-5 rounded-full"
                            >
                              Remove
                            </button>
                          ) : (
                            <div className="w-1/6"></div>
                            )}
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => push(emptyIngredient)}
                      className="bg-amber-600 hover:bg-amber-700 text-black font-bold my-2 py-1 px-5 rounded-full"
                      >
                      Add More Ingredients
                    </button>
                  </div>
                )}
              </FieldArray>
            </fieldset>
            <div className="my-5">
              <label className="block font-bold text-amber-700 text-lg" htmlFor="instructions">Instructions*</label>
              <Field
                as="textarea"
                id="instructions"
                name="instructions"
                value={values.instructions}
                onChange={handleChange}
                className="w-full h-[100px] px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500 resize-none"
                />
            </div>
            <fieldset className="my-5">
              <legend className="font-bold text-amber-700 text-lg">Nutritional Information</legend>

              <div className="flex justify-between">
                <div className="basis-1/4">
                <label className="block" htmlFor="proteins">
                  Protein
                </label>
                <Field
                  id="proteins"
                  name="proteins"
                  type="text"
                  value={values.proteins}
                  onChange={handleChange}
                  className="w-40 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="basis-1/4">
                <label className="block" htmlFor="fats">
                  Fats
                </label>
                <Field
                  id="fats"
                  name="fats"
                  type="text"
                  value={values.fats}
                  onChange={handleChange}
                  className="w-40 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />
                  </div>
                  <div className="basis-1/4">
                <label className="block" htmlFor="carbs">
                  Carbs
                </label>
                <Field
                  id="carbs"
                  name="carbs"
                  type="text"
                  value={values.carbs}
                  onChange={handleChange}
                  className="w-40 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />
                  </div>
                  <div className="basis-1/4">
                <label className="block" htmlFor="calories">
                  Calories
                </label>
                <Field
                  id="calories"
                  name="calories"
                  type="number"
                  value={values.calories}
                  onChange={handleChange}
                  className="w-40 px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                  />
                  </div>
                </div>
            </fieldset>
            <div className="my-5">
              <label className="block font-bold text-amber-700 text-lg" htmlFor="image">Image URL*</label>
              {/* <input
                id="image"
                name="image"
                type="file"
                value={values.image}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
              /> */}
              <Field
                id="image"
                name="image"
                type="text"
                placeholder="http://"
                value={values.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-700 rounded-md focus:outline-none focus:border-amber-500"
                />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-5 rounded-full">
                Submit Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RecipeForm;
