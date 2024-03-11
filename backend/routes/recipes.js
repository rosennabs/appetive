const router = require("express").Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const allRecipes = await db.query(`SELECT * FROM recipes;`);
    res.status(200).json(allRecipes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
