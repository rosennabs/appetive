const db = require("../connection");

const getReviewsByRecipeId = async function (recipe_id) {
  try {
    const queryString = `SELECT * FROM reviews WHERE recipe_id = $1;`;
    const queryParams = [recipe_id];
    const reviews = await db.query(queryString, queryParams);

    if (reviews.rows.length === 0) {
      return { message: "No reviews found" };
    }

    return reviews.rows;
  } catch (error) {
    console.error("Error in getReviewsByRecipeId:", error.message);
    throw error;
  }
};

const addReview = async function (recipe_id, rating, review, user_id) {
  try {
    const queryString = `
      INSERT INTO reviews (
        recipe_id,
        user_id,
        rating,
        review,
        created_at
      )
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
      ;`;

    const queryParams = [recipe_id, user_id, rating, review];

    const result = await db.query(queryString, queryParams);
    return result;
  } catch (error) {
    console.error("Error from addReview:", error.message);
    throw error;
  }
};

const deleteReview = async function(review_id) {
  try {
    const queryString = `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *
    ;`;
    const queryParams=[review_id]
    const result = await db.query(queryString, queryParams);
    const deletedReview = result.rows[0];
    console.log("Delete review: ", deletedReview);
    // Check if the review was deleted successfully
    if (!deletedReview) {
      throw new Error("Review not found or you don't have permission to delete it.");
    }

    return { success: true, message: 'Review deleted successfully.', deletedReview: deletedReview };
  } catch (error) {
    console.error("Error from deleteReview", error);
    throw error;
  }
}

module.exports = { getReviewsByRecipeId, addReview, deleteReview }