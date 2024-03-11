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

module.exports = {
  getRecipes,
};
