const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  }

  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "48h"})
}

module.exports = jwtGenerator;