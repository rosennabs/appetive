const db = require("../connection");
const { getRecipeById } = require("./recipes");

// Get list of fav recipe IDs for user from users_recipes table
const getUserFavs = async function (userID) {
  try {
    const queryString = `
      SELECT recipe_id FROM users_recipes
      WHERE user_id = $1 AND is_fav = TRUE;
    `;
    const queryParams = [userID];
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
const displayUserFavs = async function (favIDs) {
  try {
  const promises = favIDs.map(async (fav) => {
    const recipe = await getRecipeById(fav.recipe_id);
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image
    };
  });

  const results = await Promise.all(promises);
  console.log(results);
  return results;
} catch (error) {
  console.error("Error in displayUserFavs:", error.message);
}
};

// query if a logged in user has marked a recipe as fav. if TRUE return TRUE; if FALSE return FALSE
const checkIfFav = async function (userID, recipeID) {
  try {
    const queryString = `
      SELECT is_fav FROM users_recipes
      WHERE user_id = $1 AND recipe_id = $2;
    `;
    const queryParams = [userID, recipeID];
    const result = await db.query(queryString, queryParams);

    if (result.rows.length === 0 || !result.rows[0].is_fav) {
      return false;
    }

    return true;
  } catch {
    console.error("Error in checkIfFav:", error.message);
    throw error;
  }
};

// update user marking a recipe as fav from TRUE to FALSE or FALSE to TRUE
const toggleIsFav = async function (userID, recipeID) {
  try {
    const is_fav = await checkIfFav(userID, recipeID);
    const updateQueryString = `
      UPDATE users_recipes
      SET is_fav = $1
      WHERE user_id = $2 AND recipe_id = $3
      RETURNING is_fav;
    `;
    const updateQueryParams = [!is_fav, userID, recipeID];

    const updateResult = await db.query(updateQueryString, updateQueryParams);

    if (updateResult.rows.length > 0) {
      return updateResult.rows[0].is_fav;
    } else {
    // if relationship does not exist, create and set to TRUE
      const insertQueryString = `
        INSERT INTO users_recipes (user_id, recipe_id, is_fav)
        VALUES ($1, $2, TRUE)
        RETURNING is_fav;
      `;
      const insertQueryParams= [userID, recipeID];

      const insertResult = await db.query(insertQueryString, insertQueryParams);
      return insertResult.rows[0].is_fav;
    };
  } catch {
    console.error("Error in toggleIsFav:", error.message);
    throw error;
  }
}

module.exports = {
  getUserFavs,
  displayUserFavs,
  checkIfFav,
  toggleIsFav
};