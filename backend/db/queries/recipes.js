const db = require("../connection");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
  addRecipeIngredients,
  getUserNameById,
  getCuisineNameById,
  getDietNameById,
  getMealTypeNameById,
  getIntoleranceNameById,
  getRecipeIngredientsById,
} = require("./recipes_helpers");

const getRecipes = async function () {
  try {
    const results = [];

    const queryString = `SELECT * FROM recipes;`;
    const allRecipes = await db.query(queryString);

    if (allRecipes.rows.length === 0) {
      return { message: "No recipes found" };
    }

    //get id, title and image for recipe and put it inside an object
    for (const recipe of allRecipes.rows) {
      const recipe_obj = {};
      recipe_obj["id"] = recipe.id;
      recipe_obj["title"] = recipe.title;
      recipe_obj["image"] = recipe.image;

      results.push(recipe_obj);
    }
    return results;
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

    const recipe_obj = {};

    //add recipe id into recipe object
    recipe_obj["id"] = recipe.rows[0].id;

    //add title into recipe object
    recipe_obj["title"] = recipe.rows[0].title;

    //add image into recipe object
    recipe_obj["image"] = recipe.rows[0].image;

    //add instructions into recipe object
    recipe_obj["instructions"] = recipe.rows[0].instructions;

    //add preparation minutes into recipe object
    recipe_obj["readyInMinutes"] = recipe.rows[0].prep_time;

    //add no. of servings into recipe object
    recipe_obj["servings"] = recipe.rows[0].number_of_servings;

    //get author of the recipe by user id
    const user_name = await getUserNameById(recipe.rows[0].user_id);
    console.log(user_name);
    //add author name into recipe object
    recipe_obj["sourceName"] = user_name;

    //get cuisine of the recipe by cuisine id
    const cuisine_name = await getCuisineNameById(recipe.rows[0].cuisine_id);
    console.log(cuisine_name);
    //add cuisine name into recipe object
    recipe_obj["cuisines"] = [cuisine_name];

    //get diet of the recipe by diet id
    const diet_name = await getDietNameById(recipe.rows[0].diet_id);
    console.log(diet_name);
    //add diet name into recipe object
    recipe_obj["diets"] = [diet_name];

    //get meal_type of the recipe by meal_type id
    const meal_type_name = await getMealTypeNameById(
      recipe.rows[0].meal_type_id
    );
    console.log(meal_type_name);
    //add meal_type name into recipe object
    recipe_obj["dishTypes"] = [meal_type_name];

    //get intolerance of the recipe by intolerance id
    const intolerance_name = await getIntoleranceNameById(
      recipe.rows[0].intolerance_id
    );
    console.log(intolerance_name);
    //add meal_type name into recipe object
    // recipe_obj["type"] = [intolerance_name];

    //create nutrients array and add calories, proteins, fats and carbs
    const nutrients = [];
    const calories = {
      name: "Calories",
      amount: recipe.rows[0].calories,
      unit: "kcal",
    };

    nutrients.push(calories);

    const proteins = {
      name: "Protein",
      amount: Number(recipe.rows[0].proteins.replace("g", "")),
      unit: "g",
    };

    nutrients.push(proteins);

    const fats = {
      name: "Fat",
      amount: Number(recipe.rows[0].fats.replace("g", "")),
      unit: "g",
    };

    nutrients.push(fats);

    const carbs = {
      name: "Carbohydrates",
      amount: Number(recipe.rows[0].carbs.replace("g", "")),
      unit: "g",
    };

    nutrients.push(carbs);

    //create an empty nutrition object
    const nutrition = {};
    nutrition["nutrients"] = nutrients;

    //add nutrient object into recipe object
    recipe_obj["nutrition"] = nutrition;

    //create ingredients array and push all the ingredients
    const ingredients = [];

    //get ingredients of the recipe by recipe id
    const ingredients_all = await getRecipeIngredientsById(recipe.rows[0].id);
    console.log(ingredients_all);

    for (const ingr of ingredients_all) {
      const ingredient = {};
      ingredient["id"] = ingr.id;
      ingredient["name"] = ingr.name;
      ingredient["amount"] = Number(
        ingr.measurement.replace(/[^0-9/]/g, "").trim()
      );
      ingredient["unit"] = ingr.measurement.replace(/[0-9/]/g, "").trim();

      ingredients.push(ingredient);
    }

    console.log(ingredients);

    //add ingredients into recipe object
    recipe_obj["extendedIngredients"] = ingredients;

    //add empty reviews and comments
    // recipe_obj["reviews"] = [];
    // recipe_obj["comments"] = [];

    return recipe_obj;
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

  return db
    .query(queryString, queryParams)
    .then((data) => {
      const recipe_id = data.rows[0].id;
      addRecipeIngredients(recipe_id, ingredients);
      return data.rows[0];
    })
    .catch((error) => {
      console.error("Error in addRecipe:", error.message);
      throw error;
    });
};

const getRecipesBySearchQuery = async function (
  title,
  diet,
  cuisine,
  mealType,
  intolerance,
  minCalories,
  maxCalories
) {
  try {
    const results = [];

    // database query based on search parameters
    //1 = 1 as placeholder so that the query wouldn't break in any case like if no parameters are passed or only cuisine is passed etc.
    let queryString = "SELECT * FROM recipes WHERE 1 = 1";
    const queryParams = [];

    //Add conditions based on query parameters
    if (title) {
      queryString += ` AND title ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${title}%`);
      const recipes = await db.query(queryString, queryParams);

      if (recipes.rows.length === 0) {
        return { message: "No recipes found" };
      }

      //get title and image for recipe and put it inside an object
      for (const recipe of recipes.rows) {
        const recipe_obj = {};
        recipe_obj["id"] = recipe.id;
        recipe_obj["title"] = recipe.title;
        recipe_obj["image"] = recipe.image;

        results.push(recipe_obj);
      }
      return results;
    }

    if (cuisine) {
      const id = await getCuisineByName(cuisine);
      console.log(id);
      queryString += ` AND cuisine_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (diet) {
      const diet_array = diet.split(",");

      if (diet_array.length === 1) {
        const id = await getDietByName(diet_array[0]);
        console.log(id);
        queryString += ` AND diet_id = $${queryParams.length + 1}`;
        queryParams.push(id);
      } else {
        //get diet_id for each diet value
        const diet_ids = await Promise.all(
          diet_array.map((d) => getDietByName(d.trim()))
        );
        console.log(diet_ids);

        queryString += ` AND diet_id IN (${diet_ids
          .map((_, index) => `$${queryParams.length + index + 1}`)
          .join(", ")})`;
        queryParams.push(...diet_ids);
      }
    }

    if (mealType) {
      const id = await getMealTypeByName(mealType);
      console.log(id);
      queryString += ` AND meal_type_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (intolerance) {
      const intolerance_array = intolerance.split(",");

      if (intolerance_array.length === 1) {
        const id = await getIntoleranceByName(intolerance[0]);
        console.log(id);
        queryString += ` AND intolerance_id = $${queryParams.length + 1}`;
        queryParams.push(id);
      } else {
        const intolerance_ids = await Promise.all(
          intolerance_array.map((intolerance) =>
            getIntoleranceByName(intolerance.trim())
          )
        );
        console.log(intolerance_ids);

        queryString += ` AND intolerance_id IN (${intolerance_ids
          .map((_, index) => `$${queryParams.length + index + 1}`)
          .join(", ")})`;
        queryParams.push(...intolerance_ids);
      }
    }

    if (minCalories && maxCalories) {
      queryString += ` AND calories BETWEEN $${queryParams.length + 1} AND $${
        queryParams.length + 2
      }`;
      queryParams.push(minCalories);
      queryParams.push(maxCalories);
    } else if (minCalories) {
      queryString += ` AND calories >= $${queryParams.length + 1}`;
      queryParams.push(minCalories);
    } else if (maxCalories) {
      queryString += ` AND calories <= $${queryParams.length + 1}`;
      queryParams.push(maxCalories);
    }
    console.log(queryString);
    const recipes = await db.query(queryString, queryParams);

    if (recipes.rows.length === 0) {
      return { message: "No recipes found" };
    }

    //get title and image for recipe and put it inside an object
    for (const recipe of recipes.rows) {
      const recipe_obj = {};
      recipe_obj["id"] = recipe.id;
      recipe_obj["title"] = recipe.title;
      recipe_obj["image"] = recipe.image;

      results.push(recipe_obj);
    }
    return results;
  } catch (error) {
    console.error("Error in getRecipesBySearchQuery:", error.message);
    throw error;
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe,
  getRecipesBySearchQuery,
};
