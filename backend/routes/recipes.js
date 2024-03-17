const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe,
  getRecipesBySearchQuery,
  addReview
} = require("../db/queries/recipes");

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
      res.status(200).json(recipe[0]);
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

router.post("/:id/reviews", async (req,res) => {
  const recipeId = req.params.id;
  const newReview = req.body;
  const { user } = await jwtDecoder(newReview.user_id);
  newReview.user_id = user;
  try {
    const result = await addReview(recipeId, newReview.rating, newReview.review, newReview.user_id);
    console.log("Review added", result.rows);
    res.status(201).send(newReview);
    
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

    const recipes = await getRecipesBySearchQuery(
      title,
      diet,
      cuisine,
      mealType,
      intolerance,
      minCalories,
      maxCalories
    );

    if ("message" in recipes) {
      // No recipes found against the search
      res.status(404).json(recipes);
    } else {
      // Recipes found, return the recipes
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
