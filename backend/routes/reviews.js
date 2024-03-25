const authorization = require("../middleware/authorization");
const router = require("express").Router();
const {
  getReviewsByRecipeId,
  addReview,
  deleteReview,
} = require("../db/queries/reviews");
const { getUserNameById } = require("../db/queries/recipes_helpers");

// Get review
router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) {
      return res.status(400).json("Invalid recipe ID");
    }
    const reviews = await getReviewsByRecipeId(recipeId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Add a review
router.post("/:id", authorization, async (req, res) => {
  const recipeId = req.params.id;
  const newReview = req.body;
  newReview.user_id = req.user;
  try {
    const result = await addReview(
      recipeId,
      newReview.rating,
      newReview.review,
      newReview.user_id
    );
    console.log("Review added", result.rows);
    res.status(201).send(newReview);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Delete a review
router.delete("/:id/delete", authorization, async (req, res) => {
  const review_id = req.params.id;
  try {
    const deletedReview = await deleteReview(review_id);
    res
      .status(200)
      .send({ message: "Review deleted successfully.", deletedReview });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error from DeleteReview route");
  }
});

// Get username of the reviewer
router.get("/users/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    if (!userId) {
      return res.status(400).json("Invalid user ID");
    }
    const username = await getUserNameById(userId);
    res.status(200).json(username);
  } catch (error) {
    console.error("Error in api/reviews/:user_id route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
