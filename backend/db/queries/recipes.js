const db = require("../connection");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
  addRecipeIngredients
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

const addRecipe = async function (recipe) {
  const queryParams = [];
  const keys = Object.keys(recipe);
  const ingredients = recipe.ingredients;

  let queryString = `INSERT INTO recipes (
    cuisine_id,
    diet_id,
    meal_type_id,
    intolerance_id,
    user_id,
    title,
    image,
    prep_time,
    instructions,
    proteins,
    fats,
    carbs,
    number_of_servings,
    calories,
    created_at,
    updated_at
    )
    VALUES (
      $1, $2, $3, $4,
  `;

  queryParams.push(await getCuisineByName(recipe.cuisine));
  queryParams.push(await getDietByName(recipe.diet));
  queryParams.push(await getMealTypeByName(recipe.meal_type)),
  queryParams.push(await getIntoleranceByName(recipe.intolerances));
  // use 5 as starting point to exclude recipe.ingredients through intolerances
  for (let i = 5; i < keys.length; i++) {
    const key = keys[i];
    queryParams.push(recipe[key]);
    queryString += `$${queryParams.length}`;

    // Add to all values except for final value
    if (i < keys.length - 1) {
      queryString += `, `;
    }
  }
  
  // add ID numbers by lookup
  queryString += `)
    RETURNING id;
  `;
  console.log(queryString);
  console.log(queryParams);

  return db.query(queryString, queryParams)
    .then((data) => {
      const recipe_id = data.rows[0].id;
      addRecipeIngredients(recipe_id, ingredients);
      return data.rows[0];
    })
    .catch((error) => {
      console.error("Error in addRecipe:", error.message);
      throw error;
    })
};

module.exports = {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe
};