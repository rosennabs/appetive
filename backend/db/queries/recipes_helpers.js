const db = require("../connection");

// lookup cuisine and return ID
const getCuisineByName = async function (cuisineName) {
  try {
    const queryString = `SELECT id FROM cuisines WHERE name LIKE $1;`;
    const queryParams = [`%${cuisineName}%`];
    const cuisine = await db.query(queryString, queryParams);

    if (cuisine.rows.length === 0) {
      return { message: "Cuisine not found" };
    }

    return cuisine.rows[0].id;
  } catch (error) {
    console.error("Error in getCuisineByName:", error.message);
    throw error;
  }
};

// lookup diet and return ID
const getDietByName = async function (dietName) {
  try {
    const queryString = `SELECT id FROM diets WHERE name LIKE $1;`;
    const queryParams = [`%${dietName}%`];
    const diet = await db.query(queryString, queryParams);

    if (diet.rows.length === 0) {
      return { message: "Diet not found" };
    }

    return diet.rows[0].id;
  } catch (error) {
    console.error("Error in getDietByName:", error.message);
    throw error;
  }
};

// lookup meal_type and return ID
const getMealTypeByName = async function (mealTypeName) {
  try {
    const queryString = `SELECT id FROM meal_types WHERE name LIKE $1;`;
    const queryParams = [`%${mealTypeName}%`];
    const mealType = await db.query(queryString, queryParams);

    if (mealType.rows.length === 0) {
      return { message: "Meal Type not found" };
    }

    return mealType.rows[0].id;
  } catch (error) {
    console.error("Error in getMealTypeByName:", error.message);
    throw error;
  }
};

// lookup intolerance and return ID
const getIntoleranceByName = async function (intoleranceName) {
  try {
    const queryString = `SELECT id FROM intolerances WHERE name LIKE $1;`;
    const queryParams = [`%${intoleranceName}%`];
    const intolerance = await db.query(queryString, queryParams);

    if (intolerance.rows.length === 0) {
      return { message: "Intolerance not found" };
    }

    return intolerance.rows[0].id;
  } catch (error) {
    console.error("Error in getIntoleranceByName:", error.message);
    throw error;
  }
};

// lookup ingredient and return ID
const getIngredientByName = async function (ingredientName) {
  try {
    const queryString = `SELECT id FROM ingredients WHERE name LIKE $1;`;
    const queryParams = [`%${ingredientName}%`];
    const ingredient = await db.query(queryString, queryParams);

    if (ingredient.rows.length === 0) {
      return { message: "Ingredient not found" };
    }

    return ingredient.rows[0].id;
  } catch (error) {
    console.error("Error in getIngredientByName:", error.message);
    throw error;
  }
};

const addRecipeIngredients = function (recipe_id, ingredients) {
  ingredients.forEach(async (ingredient) => {
    const ingredient_id = await getIngredientByName(ingredient.name);

    if (ingredient_id) {
      const queryString = `INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement) VALUES ($1, $2, $3)`;
      const queryParams = [recipe_id, ingredient_id, ingredient.measurement];

      return db
        .query(queryString, queryParams)
        .then((data) => {
          console.log("addRecipeIngredients was run");
          return data.rows[0];
        })
        .catch((error) => {
          console.error("Error in addRecipeIngredients:", error.message);
          throw error;
        });
    } else {
      return "Ingredient was not found";
    }
  });
};

// lookup user id and return user name
const getUserNameById = async function (id) {
  try {
    const queryString = `SELECT name FROM users WHERE id = $1;`;
    const queryParams = [`${id}`];
    const user_name = await db.query(queryString, queryParams);

    if (user_name.rows.length === 0) {
      return { message: "User not found" };
    }

    return user_name.rows[0].name;
  } catch (error) {
    console.error("Error in getUserNameById:", error.message);
    throw error;
  }
};

// lookup cuisine id and return cuisine name
const getCuisineNameById = async function (id) {
  try {
    const queryString = `SELECT name FROM cuisines WHERE id = $1;`;
    const queryParams = [`${id}`];
    const cuisine_name = await db.query(queryString, queryParams);

    if (cuisine_name.rows.length === 0) {
      return { message: "Cuisine not found" };
    }

    return cuisine_name.rows[0].name;
  } catch (error) {
    console.error("Error in getUsernameById:", error.message);
    throw error;
  }
};

// lookup diet id and return diet name
const getDietNameById = async function (id) {
  try {
    const queryString = `SELECT name FROM diets WHERE id = $1;`;
    const queryParams = [`${id}`];
    const diet_name = await db.query(queryString, queryParams);

    if (diet_name.rows.length === 0) {
      return { message: "Diet not found" };
    }

    return diet_name.rows[0].name;
  } catch (error) {
    console.error("Error in getDietNameById:", error.message);
    throw error;
  }
};

module.exports = {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
  addRecipeIngredients,
  getUserNameById,
  getCuisineNameById,
  getDietNameById,
};
