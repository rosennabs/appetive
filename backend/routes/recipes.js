const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe,
  getRecipesBySearchQuery,
} = require("../db/queries/recipes");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
  getUserNameById,
  getCuisineNameById,
  getDietNameById,
  getMealTypeNameById,
  getIntoleranceNameById,
  getRecipeIngredientsById,
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

    const results = [];

    const recipe = await getRecipeById(recipeId);

    if ("message" in recipe) {
      // Recipe not found
      res.status(404).json(recipe);
    } else {
      // Recipe found

      const recipe_obj = {};

      //add recipe id into recipe object
      recipe_obj["id"] = recipe.id;

      //add title into recipe object
      recipe_obj["title"] = recipe.title;

      //add image into recipe object
      recipe_obj["image"] = recipe.image;

      //add instructions into recipe object
      recipe_obj["instructions"] = recipe.instructions;

      //add preparation minutes into recipe object
      recipe_obj["readyInMinutes"] = recipe.prep_time;

      //add no. of servings into recipe object
      recipe_obj["servings"] = recipe.number_of_servings;

      //get author of the recipe by user id
      const user_name = await getUserNameById(recipe.user_id);
      console.log(user_name);
      //add author name into recipe object
      recipe_obj["sourceName"] = user_name;

      //get cuisine of the recipe by cuisine id
      const cuisine_name = await getCuisineNameById(recipe.cuisine_id);
      console.log(cuisine_name);
      //add cuisine name into recipe object
      recipe_obj["cuisines"] = [cuisine_name];

      //get diet of the recipe by diet id
      const diet_name = await getDietNameById(recipe.diet_id);
      console.log(diet_name);
      //add diet name into recipe object
      recipe_obj["diets"] = [diet_name];

      //get meal_type of the recipe by meal_type id
      const meal_type_name = await getMealTypeNameById(recipe.meal_type_id);
      console.log(meal_type_name);
      //add meal_type name into recipe object
      recipe_obj["type"] = [meal_type_name];

      //get intolerance of the recipe by intolerance id
      const intolerance_name = await getIntoleranceNameById(
        recipe.intolerance_id
      );
      console.log(intolerance_name);
      //add meal_type name into recipe object
      // recipe_obj["type"] = [intolerance_name];

      //create nutrients array and add calories, proteins, fats and carbs
      const nutrients = [];
      const calories = {
        name: "Calories",
        amount: recipe.calories,
        unit: "kcal",
      };

      nutrients.push(calories);

      const proteins = {
        name: "Protein",
        amount: Number(recipe.proteins.replace("g", "")),
        unit: "g",
      };

      nutrients.push(proteins);

      const fats = {
        name: "Fat",
        amount: Number(recipe.fats.replace("g", "")),
        unit: "g",
      };

      nutrients.push(fats);

      const carbs = {
        name: "Carbohydrates",
        amount: Number(recipe.carbs.replace("g", "")),
        unit: "g",
      };

      nutrients.push(carbs);

      //add nutrients into recipe object
      recipe_obj["nutrients"] = nutrients;

      //create ingredients array and push all the ingredients
      const ingredients = [];

      //get ingredients of the recipe by recipe id
      const ingredients_all = await getRecipeIngredientsById(recipe.id);
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
      recipe_obj["ingredients"] = ingredients;

      //push final recipe object into results array
      results.push(recipe_obj);

      res.status(200).json(results);
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
