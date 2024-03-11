const router = require("express").Router();
const db = require("../db/connection");
const { getRecipes } = require("../db/queries/recipes");

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
    const recipe = await db.query(`SELECT * FROM recipes WHERE id = $1`, [
      recipeId,
    ]);

    // Check if recipe exists
    if (recipe.rows.length === 0) {
      return res.status(404).json("Recipe not found");
    }

    res.status(200).json(recipe.rows[0]);
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
    const reviews = await db.query(
      `SELECT * FROM reviews WHERE recipe_id = $1`,
      [recipeId]
    );

    // Check if reviews exist
    if (reviews.rows.length === 0) {
      return res.status(404).json("No reviews found");
    }

    res.status(200).json(reviews.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
