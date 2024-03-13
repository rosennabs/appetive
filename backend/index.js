require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db/connection");

//middleware
app.use(cors()); // enable CORS for all routes
app.use(express.json()); //access req.body

// TEST ROUTE with Postman
// app.get("/users", async(req, res) => {
//   try {
//     console.log(req.body);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//Recipes routes
app.use("/api/recipes", require("./routes/recipes"));

app.listen(8080, () => {
  console.log("Server has started on port 8080");
});
