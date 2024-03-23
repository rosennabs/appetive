const db = require("../connection");

// Get all recipes created by user
const getUserRecipes = async function (userID) {
  try {
    const queryString = `
      SELECT * FROM recipes
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