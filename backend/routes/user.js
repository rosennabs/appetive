const router = require("express").Router();
const {
  getUserFavs,
  displayUserFavs,
  checkIfFav,
  toggleIsFav,
} = require("../db/queries/favlist");
const { getUserNameById } = require("../db/queries/recipes_helpers");
const { getUserRecipes, displayUserRecipes } = require("../db/queries/user");
const jwtDecoder = require("../utils/jwtDecoder");
const authorization = require("../middleware/authorization");

// Get username
router.get("/", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const username = await getUserNameById(user_id);
    res.status(200).json(username);
  } catch (error) {
    console.error("Error in api/user/ route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Return list of all user favs using token
router.get("/fav", authorization, async (req, res) => {
  try {
    const userFavs = await getUserFavs(req.user);
    const displayFavs = await displayUserFavs(userFavs);
    res.status(200).json(displayFavs);
  } catch (error) {
    console.error("Error in api/user/fav route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all recipes created by user
router.get("/recipe", authorization, async (req, res) => {
  try {
    const userRecipes = await getUserRecipes(req.user);
    const displayRecipes = await displayUserRecipes(userRecipes);
    res.status(200).json(displayRecipes);
  } catch (error) {
    console.error("Error in api/user/recipe route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get fav status
router.get("/recipe/:id", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const recipe_id = req.params.id;
    const response = await checkIfFav(user_id, recipe_id);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in api/user/recipe/:id/fav GET route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - POST - toggle fav
router.post("/recipe/:id/fav", async (req, res) => {
  try {
    // req should contain token from localStorage AND recipe id
    const { user } = await jwtDecoder(req.body.token);
    const recipe_id = req.body.recipe_id;
    const toggle = await toggleIsFav(user, recipe_id);

    res.status(204).send(toggle);
  } catch (error) {
    console.error("Error in api/user/recipe/:id/fav route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
