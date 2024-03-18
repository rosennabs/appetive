const db = require("../connection");

// GET all favs for user from users_recipes table
const getUserFavs = async function (userID) {
  try {
    const queryString = `
      SELECT recipe_id FROM users_recipes
      WHERE user_id = $1 AND is_fav = TRUE
      ;
    `;
    const queryParams = [`${userID}`];
    const results = await db.query(queryString, queryParams);

    if (results.rows.length === 0) {
      return { message: "User has no favs" };
    }

    return results.rows[0];
    
  } catch (error) {
    console.error("Error in getUserFavs:", error.message);
    throw error;
  }
};

// and get information for each recipe

// query if a logged in user has marked a recipe as fav. if TRUE return TRUE; if FALSE return FALSE

// update user marking a recipe as fav from TRUE to FALSE or FALSE to TRUE