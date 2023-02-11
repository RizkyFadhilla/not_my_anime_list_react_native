const { verifyToken } = require("../helpers/jwt");
let { Author } = require("../models");

async function Authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Please_Login" };
    }
    let payload = verifyToken(access_token);
    let findUser = await Author.findByPk(payload.id);
    if (!findUser) {
      throw { name: "Please_Login" };
    }
    req.user = {
      id: findUser.id,
      role: findUser.role,
      username: findUser.username,
    };
    console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = Authentication;
