const router = require("express").Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const authorization = require("../middleware/authorization")

//Register route
router.post("/register", async(req,res) => {
  try {
    const {name, email, password} = req.body
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist.")
    }

    // Bcrypt the user password
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);

    // Generating our jwt token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", async(req,res) => {
  try {
    const { email, password } = req.body
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (user.rows.length === 0) {
      return res.status(401).send("Password or email is incorrect")
    }
    // const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (password !== user.rows[0].password) {
      return res.status(401).send("Password or email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].id)
    res.json({ token })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

router.get("/is-verify", authorization, async(req,res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
