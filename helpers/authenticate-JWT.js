const jwt = require("jsonwebtoken");

async function authenticateToken(token) {
  let payload = token && token.split('.')[1]
  if (payload == null || payload == undefined) return payload
  let decoded = jwt.decode(token)
  return decoded.user
}

module.exports = {
  authenticateToken,
};