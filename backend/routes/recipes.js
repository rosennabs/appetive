require("dotenv").config();
const authorization = require("../middleware/authorization");
const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  addRecipe,
  getRecipesBySearchQuery,
  toggleHasTried,
  updateCounter,
  getUserRecipeData,
} = require("../db/queries/recipes");

const jwtDecoder = require("../utils/jwtDecoder");
const axios = require("axios");

router.get("/", async (_req, res) => {
  try {
    //Getting recipes from external api
    const apiOptions = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: {
        number: "100",
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": process.env.API_HOST,
      },
    };

    const apiResponse = await axios.request(apiOptions);
    const apiRecipes = apiResponse.data.results;

    //Getting recipes from db
    const dbRecipes = await getRecipes();

    //merging results of db and external api
    const allRecipes = [...apiRecipes, ...dbRecipes];
    // console.log(allRecipes);

    if (allRecipes.length === 0) {
      // No recipes found
      res.status(404).json({ message: "No recipes found", allRecipes });
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
  console.log(req.query);
  try {
    const {
      query: title,
      diet,
      cuisine,
      type,
      intolerances,
      minCalories,
      maxCalories,
    } = req.query;

    console.log("options", req.query);
    //Getting results from external api
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": process.env.API_HOST,
      },
    };

    const response = await axios.request(options);
    const apiSearchResponse = response.data.results;
    // console.log("apiSearchResponse", apiSearchResponse);

    //Getting results from db
    const dbSearchResponse = await getRecipesBySearchQuery(
      title,
      diet,
      cuisine,
      type,
      intolerances,
      minCalories,
      maxCalories
    );
    // console.log("dbSearchResponse", dbSearchResponse);

    //merging results of db and external api
    const allRecipes = [...apiSearchResponse, ...dbSearchResponse];
    console.log("allRecipes", allRecipes);

    if (allRecipes.length === 0) {
      // No recipes found
      res.status(404).json({ message: "No recipes found", allRecipes });
    } else {
      // Recipes found, return the array
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get user_recipe data
router.get("/userRecipeData/:recipe_id", authorization, async (req, res) => {
  const { recipe_id } = req.params;
  const user_id = req.user;
  try {
    const userRecipeData = await getUserRecipeData(user_id, recipe_id);
    return res.status(200).send(userRecipeData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error from userRecipeData route");
  }
});

//Toggle has_tried button & update counter_attempt
router.post("/:id", authorization, async (req, res) => {
  const recipeId = req.params.id;
  const user_id = req.user;
  try {
    const toggleTrigger = await toggleHasTried(user_id, recipeId);
    const counterTrigger = await updateCounter(user_id, recipeId);
    const result = { toggleTrigger, counterTrigger };
    console.log("Data from has_tried toggle: ", result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error from has_tried button");
  }
});

module.exports = router;
