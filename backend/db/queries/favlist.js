const db = require("../connection");
const { getRecipeById } = require("./recipes");

// Get list of fav recipe IDs for user from users_recipes table
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

    return results.rows; // returns array of objects each with recipe_id key and value
  } catch (error) {
    console.error("Error in getUserFavs:", error.message);
    throw error;
  }
};

// Get information for each recipe in recipe IDs array
const displayUserFavs = function (favIDs) {
  const results = {};

  favIDs.forEach(async (fav) => {
    const recipe = await getRecipeById(fav.recipe_id);
    const recipe_obj = {};
    recipe_obj["id"] = recipe.id;
    recipe_obj["title"] = recipe.title;
    recipe_obj["image"] = recipe.image;

    results.push(recipe_obj);
  });

  return results;
};

// query if a logged in user has marked a recipe as fav. if TRUE return TRUE; if FALSE return FALSE

// update user marking a recipe as fav from TRUE to FALSE or FALSE to TRUE