const db = require("../connection");

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

module.exports = {
  getRecipes,
  getRecipeById,
};
