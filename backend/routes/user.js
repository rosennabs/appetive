const router = require("express").Router();
const {
  getUserFavs,
  displayUserFavs,
  checkIfFav,
  toggleIsFav
} = require("../db/queries/favlist");
const { getUserNameById } = require("../db/queries/recipes_helpers");
const jwtDecoder = require("../utils/jwtDecoder");

// Get username
router.post("/", async (req, res) => {
  try {
    const { user } = await jwtDecoder(req.body.token);
    const username = await getUserNameById(user);
    res.status(200).json(username);
  } catch (error) {
    console.error("Error in api/user/ route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET - display all user favs
router.post("/fav", async (req, res) => {
  try {
    const { user } = await jwtDecoder(req.body.token); // req should contain token from localStorage
    const userFavs = await getUserFavs(user);
    const displayFavs = await displayUserFavs(userFavs);
    res.status(200).json(displayFavs);
  } catch (error) {
    console.error("Error in api/user/fav route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - POST - toggle fav
router.post("/:id/fav", async (req, res) => {
  try {
    // req should contain token from localStorage AND recipe id
    const { user } = await jwtDecoder(req.body.token);
    const recipe_id = req.body.recipe_id;
    const toggle = await toggleIsFav(user, recipe_id);

    res.status(204).send(toggle);

  } catch (error) {
    console.error("Error in api/user/:id/fav route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;