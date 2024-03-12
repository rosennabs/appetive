const db = require("../connection");

// lookup cuisine and return ID
const getCuisineByName = async function (cuisineName) {
  try {
    const queryString = `SELECT id FROM cuisines WHERE name LIKE $1;`;
    const queryParams = [`%${cuisineName}%`];
    const cuisine = await db.query(queryString, queryParams);

    if (cuisine.rows.length === 0) {
      return { message: "Cuisine not found" };
    }

    return cuisine.rows[0];
  } catch (error) {
    console.error("Error in getCuisineByName:", error.message);
    throw error;
  }
};

// lookup diet and return ID
// lookup meal_type and return ID
// lookup ingredient and return ID

module.exports = {
  getCuisineByName
};