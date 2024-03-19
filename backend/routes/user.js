const router = require("express").Router();
const {
  getUserFavs,
  displayUserFavs,
  checkIfFav,
  toggleIsFav
} = require("../db/queries/favlist");
const jwtDecoder = require("../utils/jwtDecoder");

// READ - GET - display all user favs
router.get("/:id", async (req, res) => {
  try {
    const { user } = await jwtDecoder(req.body); // req should contain token from localStorage
    const userFavs = await getUserFavs(user);
    const displayFavs = await displayUserFavs(userFavs);
    res.status(200).json(displayFavs);
  } catch (error) {
    console.error("Error in api/user/:id route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - POST - toggle fav
router.post("/:id", async (req, res) => {
  try {
    // req should contain token from localStorage AND recipe id
    const { user } = await jwtDecoder(req.body.token);
    const recipe_id = req.body.recipe_id;
    const toggle = await toggleIsFav(user, recipe_id);

    res.status(204).send(toggle);

  } catch (error) {
    console.error("Error in api/user/:id route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;