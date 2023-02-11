const { comparePassword } = require("../helpers/bcryptjs");
const { signPayloadToToken } = require("../helpers/jwt");
let { Author, Movie, Genre, Cast } = require("../models");

class UserController {
  static async Login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!password) {
        throw { name: "ERROR_INVALID_EMAIL_OR_PASSWORD" };
      }
      let userLogin = await Author.findOne({
        where: {
          email,
        },
      });
      if (!userLogin) {
        throw { name: "ERROR_INVALID_EMAIL_OR_PASSWORD" };
      }
      const comparePass = comparePassword(password, userLogin.password);
      if (!comparePass) {
        throw { name: "ERROR_INVALID_EMAIL_OR_PASSWORD" };
      }
      const username = userLogin.username;
      const role = userLogin.role;
      const payload = {
        id: userLogin.id,
        username: userLogin.username,
      };
      const access_token = signPayloadToToken(payload);
      res.status(200).json({ access_token, username, role });
    } catch (error) {
      next(error);
    }
  }

  static async Register(req, res, next) {
    try {
      let { email, username, password, phoneNumber, Address } = req.body;
      let registerUser = await Author.create({
        email,
        username,
        password,
        phoneNumber,
        role :"admin",
        Address,
      });
      res.status(201).send(registerUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
