const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe,
} = require("../db/queries/recipes");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
} = require("../db/queries/recipes_helpers");
const jwtDecoder = require("../utils/jwtDecoder");

router.get("/", async (_req, res) => {
  try {
    const allRecipes = await getRecipes();
    if ("message" in allRecipes) {
      // No recipes found
      res.status(404).json(allRecipes);
    } else {
      // Recipes found, return the array
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    console.error("Error in api/recipes route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) {
      return res.status(400).json("Invalid recipe ID");
    }

    const recipe = await getRecipeById(recipeId);

    if ("message" in recipe) {
      // Recipe not found
      res.status(404).json(recipe);
    } else {
      // Recipe found
      res.status(200).json(recipe);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) {
      return res.status(400).json("Invalid recipe ID");
    }
    const reviews = await getReviewsByRecipeId(recipeId);

    if ("message" in reviews) {
      // No reviews found for the recipe
      res.status(404).json(reviews);
    } else {
      // Reviews found, return the array
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecipe = req.body;
    const currentTime = new Date();
    const { user } = await jwtDecoder(newRecipe.user_id);

    newRecipe.user_id = user;
    newRecipe.created_at = currentTime;
    newRecipe.updated_at = currentTime;

    await addRecipe(newRecipe);
    res.status(201).send();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/search", async (req, res) => {
  try {
    const {
      title,
      diet,
      cuisine,
      mealType,
      intolerance,
      minCalories,
      maxCalories,
    } = req.query;

    // database query based on search parameters
    //1 = 1 as placeholder so that the query wouldn't break in any case like if no parameters are passed or only cuisine is passed etc.
    let queryString = "SELECT * FROM recipes WHERE 1 = 1";
    const queryParams = [];

    //Add conditions based on query parameters
    if (title) {
      queryString += ` AND title ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${title}%`);
      const recipes = await db.query(queryString, queryParams);
      return res.status(200).json(recipes.rows);
    }

    if (cuisine) {
      const id = await getCuisineByName(cuisine);
      console.log(id);
      queryString += `cuisine_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (diet) {
      const diet_array = diet.split(",");

      if (diet_array.length === 1) {
        const id = await getDietByName(diet_array[0]);
        console.log(id);
        queryString += ` AND diet_id = $${queryParams.length + 1}`;
        queryParams.push(id);
      }
    }

    if (mealType) {
      const id = await getMealTypeByName(mealType);
      console.log(id);
      queryString += ` AND meal_type_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (intolerance) {
      const id = await getIntoleranceByName(intolerance);
      console.log(id);
      queryString += ` AND intolerance_id = $${queryParams.length + 1}`;
      queryParams.push(id);
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

    const recipes = await db.query(queryString, queryParams);
    return res.status(200).json(recipes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
