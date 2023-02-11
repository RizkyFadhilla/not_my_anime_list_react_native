const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signPayloadToToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { signPayloadToToken, verifyToken };
