const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtDecoder(token) {
  return jwt.verify(token, process.env.jwtSecret);
}

module.exports = jwtDecoder;