import React from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import axios from "axios";
import { FaPlusCircle, FaTrashAlt, FaExclamationCircle } from "react-icons/fa";
import * as Yup from "yup";

const cuisine = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

const diet = [
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

const type = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

function RecipeForm() {
  const emptyIngredient = {
    measurement: "",
    name: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(
      <div>
        <FaExclamationCircle className="inline-block mr-1" />
        Title is required
      </div>
    ),
    prep_time: Yup.number()
      .positive(
        <div>
          <FaExclamationCircle className="inline-block mr-1" />
          Prep time must be greater than 0
        </div>
      )
      .required(
        <div>
          <FaExclamationCircle className="inline-block mr-1" />
          Prep time is required
        </div>
      ),
    number_of_servings: Yup.number()
      .positive(
        <div>
          <FaExclamationCircle className="inline-block mr-1" />
          Servings must be greater than 0
        </div>
      )
      .required(
        <div>
          <FaExclamationCircle className="inline-block mr-1" />
          Number of servings is required
        </div>
      ),
    instructions: Yup.string().required(
      <div>
        <FaExclamationCircle className="inline-block mr-1" />
        Instructions are required
      </div>
    ),
    image: Yup.string().required(
      <div>
        <FaExclamationCircle className="inline-block mr-1" />
        Image is required
      </div>
    ),
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src={require("../Images/recipe-header.png")}
          alt="Header Image"
          className="h-auto w-4/5 mt-16 mb-10"
        />
      </div>

      <div className="max-w-screen-md mx-auto">
        <Formik
          initialValues={{
            ingredients: [emptyIngredient],
            cuisine: "African",
            diet: "NULL",
            meal_type: "main course",
            intolerances: "NULL",
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
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form className="bg-white rounded-xl p-12 drop-shadow-3xl">
              <span className="text-sm italic text-red-500">* Required</span>
              <div className="my-5">
                <label className="block font-bold text-lg" htmlFor="title">
                  Recipe Title<span className="text-red-500">*</span>
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="error text-red-600 text-sm"
                />
              </div>
              <div className="flex justify-between my-5">
                <div className="basis-1/2 space-x-1">
                  <label className="block font-bold text-lg" htmlFor="cuisine">
                    Cuisine<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="cuisine"
                    name="cuisine"
                    value={values.cuisine}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                  >
                    {cuisine.map((cuisineName, index) => (
                      <option key={`cuisine-${index}`} value={cuisineName}>
                        {cuisineName}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="basis-1/2 space-x-1">
                  <label
                    className="block font-bold text-lg"
                    htmlFor="meal_type"
                  >
                    Meal Type<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="meal_type"
                    name="meal_type"
                    value={values.meal_type}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                  >
                    {type.map((typeName, index) => (
                      <option key={`type-${index}`} value={typeName}>
                        {typeName}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <fieldset className="my-5">
                <legend className="font-bold text-lg">
                  Dietary Restrictions
                </legend>
                <div className="flex justify-between my-1">
                  <div className="basis-1/2 space-x-1">
                    <label className="block text-brown-light" htmlFor="diet">
                      Diet
                    </label>
                    <Field
                      as="select"
                      id="diet"
                      name="diet"
                      value={values.diet}
                      onChange={handleChange}
                      className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    >
                      <option value="">None</option>
                      {diet.map((dietName, index) => (
                        <option key={`diet-${index}`} value={dietName}>
                          {dietName}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="basis-1/2 space-x-1">
                    <label
                      className="block text-brown-light"
                      htmlFor="intolerances"
                    >
                      Intolerances
                    </label>
                    <Field
                      as="select"
                      id="intolerances"
                      name="intolerances"
                      value={values.intolerances}
                      onChange={handleChange}
                      className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    >
                      <option value="">None</option>
                      {intolerances.map((intoleranceName, index) => (
                        <option
                          key={`intolerance-${index}`}
                          value={intoleranceName}
                        >
                          {intoleranceName}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-between my-5">
                <div className="basis-1/2 space-x-1">
                  <label
                    className="block font-bold text-lg"
                    htmlFor="prep_time"
                  >
                    Prep Time<span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="prep_time"
                    name="prep_time"
                    type="number"
                    value={values.prep_time}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                  />{" "}
                  minutes
                </div>
                <ErrorMessage
                  name="prep_time"
                  component="div"
                  className="error text-red-600 text-sm"
                />
                <div className="basis-1/2 space-x-1">
                  <label
                    className="block font-bold text-lg"
                    htmlFor="number_of_servings"
                  >
                    Number of Servings<span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="number_of_servings"
                    name="number_of_servings"
                    type="number"
                    value={values.number_of_servings}
                    onChange={handleChange}
                    className="w-48 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                  />
                  <ErrorMessage
                    name="number_of_servings"
                    component="div"
                    className="error text-red-600 text-sm"
                  />
                </div>
              </div>
              <fieldset className="my-5">
                <label
                  className="block font-bold text-lg"
                  htmlFor="ingredients"
                >
                  Ingredients<span className="text-red-500">*</span>
                </label>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <div>
                      {values.ingredients.map((ingredient, index) => {
                        const startName = `ingredients[${index.toString()}]`;

                        return (
                          <div
                            className="flex space-x-1 my-1"
                            key={`ingredient-${index.toString()}`}
                          >
                            <Field
                              name={`${startName}.measurement`}
                              type="text"
                              placeholder="50g"
                              value={values.ingredients[index].measurement}
                              onChange={handleChange}
                              className="w-1/6 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                            />
                            <Field
                              name={`${startName}.name`}
                              type="text"
                              placeholder="carrots"
                              value={values.ingredients[index].name}
                              onChange={handleChange}
                              className="w-4/6 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                            />
                            {index > 0 ? (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-400 text-xl py-1 px-5 hover:text-red-600"
                              >
                                <FaTrashAlt />
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
                        className="bg-yellow bg-opacity-60 text-sm text-black my-2 py-2 px-4 rounded-full hover:bg-opacity-100"
                      >
                        <FaPlusCircle className="inline-block mr-2" />
                        Add More Ingredients
                      </button>
                    </div>
                  )}
                </FieldArray>
              </fieldset>
              <div className="my-5">
                <label
                  className="block font-bold text-lg"
                  htmlFor="instructions"
                >
                  Instructions<span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  id="instructions"
                  name="instructions"
                  value={values.instructions}
                  onChange={handleChange}
                  className="w-full h-[100px] px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1 resize-none"
                />
                <ErrorMessage
                  name="instructions"
                  component="div"
                  className="error text-red-600 text-sm"
                />
              </div>
              <fieldset className="my-5">
                <legend className="font-bold text-lg">
                  Nutritional Information
                </legend>

                <div className="flex justify-between">
                  <div className="basis-1/4">
                    <label
                      className="block text-brown-light"
                      htmlFor="proteins"
                    >
                      Protein
                    </label>
                    <Field
                      id="proteins"
                      name="proteins"
                      type="text"
                      value={values.proteins}
                      onChange={handleChange}
                      className="w-40 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    />
                  </div>
                  <div className="basis-1/4">
                    <label className="block text-brown-light" htmlFor="fats">
                      Fats
                    </label>
                    <Field
                      id="fats"
                      name="fats"
                      type="text"
                      value={values.fats}
                      onChange={handleChange}
                      className="w-40 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    />
                  </div>
                  <div className="basis-1/4">
                    <label className="block text-brown-light" htmlFor="carbs">
                      Carbs
                    </label>
                    <Field
                      id="carbs"
                      name="carbs"
                      type="text"
                      value={values.carbs}
                      onChange={handleChange}
                      className="w-40 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    />
                  </div>
                  <div className="basis-1/4">
                    <label
                      className="block text-brown-light"
                      htmlFor="calories"
                    >
                      Calories
                    </label>
                    <Field
                      id="calories"
                      name="calories"
                      type="number"
                      value={values.calories}
                      onChange={handleChange}
                      className="w-40 px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                    />
                  </div>
                </div>
              </fieldset>
              <div className="my-5">
                <label className="block font-bold text-lg" htmlFor="image">
                  Image URL<span className="text-red-500">*</span>
                </label>
                <Field
                  id="image"
                  name="image"
                  type="text"
                  placeholder="http://"
                  value={values.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-opacity-20 border-brown-light rounded-md focus:outline-none focus:border-yellow my-1"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="error text-red-600 text-sm"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow text-black py-2 px-6 mb-4 mt-2 rounded-full hover:bg-brown-light hover:text-darker-white"
                >
                  Create Recipe
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default RecipeForm;
