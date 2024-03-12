const db = require("../connection");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIngredientByName
} = require("./recipes_helpers");

const getRecipes = async function () {
  try {
    const queryString = `SELECT * FROM recipes;`;
    const allRecipes = await db.query(queryString);

    if (allRecipes.rows.length === 0) {
      return { message: "No recipes found" };
    }

    return allRecipes.rows;
  } catch (error) {
    console.error("Error in getRecipes:", error.message);
    throw error;
  }
};

const getRecipeById = async function (recipe_id) {
  try {
    const queryString = `SELECT * FROM recipes WHERE id = $1;`;
    const queryParams = [recipe_id];
    const recipe = await db.query(queryString, queryParams);

    if (recipe.rows.length === 0) {
      return { message: "Recipe not found" };
    }

    return recipe.rows[0];
  } catch (error) {
    console.error("Error in getRecipeById:", error.message);
    throw error;
  }
};

const getReviewsByRecipeId = async function (recipe_id) {
  try {
    const queryString = `SELECT * FROM reviews WHERE recipe_id = $1;`;
    const queryParams = [recipe_id];
    const reviews = await db.query(queryString, queryParams);

    if (reviews.rows.length === 0) {
      return { message: "No reviews found" };
    }

    return reviews.rows;
  } catch (error) {
    console.error("Error in getReviewsByRecipeId:", error.message);
    throw error;
  }
};

const addRecipe = function (recipe) {
  // should insert to table
  const queryParams = [];
  const keys = Object.keys(recipe)

  let queryString = `INSERT INTO recipes (
    title,
    prep_time,
    instructions,
    proteins,
    fats,
    carbs,
    number_of_servings,
    calories,
    cuisine,
    diet,
    meal_type
    )
    VALUES (
  `;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    queryParams.push(recipe[key]);
    queryString += `$${queryParams.length}`;

    // Add to all values except for final value
    if (i < keys.length - 1) {
      queryString += `, `;
    }
  }
  
  // add cuisine ID with lookup
  queryString += `${getCuisineByName(recipe[cuisine])}`;
  // add diet ID with lookup
  queryString += `${getDietByName(recipe[diet])}`;
  // add meal_type ID with lookup
  queryString += `${getMealTypeByName(recipe[meal_type])}`;

  queryString += `);
  SELECT SCOPE_IDENTITY()`;

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows[0]; // returned SCOPE_IDENTITY will be used as parameter for recipe_ingredients helper function
    })
    .catch((error) => {
      console.error("Error in addRecipe:", error.message);
      throw error;
    })
};

// helper function to return ingredient ID by name

// helper function to insert to recipes_ingredients table
// recipe_id will be obtained from addRecipe via SCOPE_IDENTITY
// ingredients is an array
const addRecipeIngredients = function (recipe_id, ingredients) {

};

module.exports = {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
};
