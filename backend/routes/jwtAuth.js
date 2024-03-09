const router = require("express").Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const authorization = require("../middleware/authorization")

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

    // res.json(newUser.rows[0]);

    //5. Generating our jwt token

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
    // 1. Destructure req.body
    const { email, password } = req.body
    // 2. Check if user doesn't exit, throw error
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    // res.json(user.rows[0]);
    if (user.rows.length === 0) {
      return res.status(401).send("Password or email is incorrect")
    }

    // 3. Check if the password if the same with db password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      res.status(401).send("Password or email is incorrect");
    }

    // 4. Give the jwt token
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
