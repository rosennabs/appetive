const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
} = require("../db/queries/recipes");

const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
} = require("../db/queries/recipes_helpers");

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

router.post("/search", async (req, res) => {
  try {
    const {
      title,
      diet,
      cuisine,
      mealType,
      intolerances,
      minCalories,
      maxCalories,
    } = req.query;

    // database query based on search parameters
    let queryString = "SELECT * FROM recipes WHERE ";
    const queryParams = [];

    //Add conditions based on query parameters
    if (title) {
      queryString += `title ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${title}%`);
      const recipes = await db.query(queryString, queryParams);
      return res.status(200).json(recipes.rows);
    }

    if (cuisine) {
      const { id } = await getCuisineByName(cuisine);
      console.log(id);
      queryString += `cuisine_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (diet) {
      const { id } = await getDietByName(diet);
      console.log(id);
      queryString += ` AND diet_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (mealType) {
      const { id } = await getMealTypeByName(mealType);
      console.log(id);
    }
    const recipes = await db.query(queryString, queryParams);
    return res.status(200).json(recipes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
