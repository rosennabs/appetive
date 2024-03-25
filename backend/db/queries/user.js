const db = require("../connection");
const { getRecipeById } = require("./recipes");

// Get all recipes created by user
const getUserRecipes = async function (userID) {
  try {
    const queryString = `
      SELECT id FROM recipes
      WHERE user_id = $1;
    `;
    const queryParams = [userID];
    const results = await db.query(queryString, queryParams);

    if (results.rows.length === 0) {
      return { message: "User has no recipes" };
    }

    return results.rows;    
  } catch (error) {
    console.error("Error in getUserRecipes:", error.message);
    throw error;
  }
};

// Get display information for each recipe in array
const displayUserRecipes = async function (recipeIDs) {
  try {
  const promises = recipeIDs.map(async (recipeID) => {
    const recipe = await getRecipeById(recipeID.id);
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image
    };
  });

  const results = await Promise.all(promises);
  return results;
} catch (error) {
  console.error("Error in displayUserRecipes:", error.message);
}
};

module.exports = {
  getUserRecipes,
  displayUserRecipes
};