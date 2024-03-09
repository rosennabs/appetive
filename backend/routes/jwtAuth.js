const router = require("express").Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");

//Registering route

router.post("/register", async(req,res) => {
  try {
    //1. destructure the req.body

    const {name, email, password} = req.body

    //2. check if user exist (if exist then throw error)
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    // res.json(user.rows) 

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist.")
    }

    //3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the new user into our db
    const newUser = await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

    res.json(newUser.rows[0]);

    //5. Generating our jwt token
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
