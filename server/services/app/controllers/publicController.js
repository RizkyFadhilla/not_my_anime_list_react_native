let { Author, Movie, Genre, Cast } = require("../models");

class PublicController {
  static async fetchAllData(req, res, next) {
    try {
      let data = await Movie.findAll({
        include: [
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async fetchOneData(req, res, next) {
    console.log("trigger")
    try {
      let id = req.params.movieId;
      let data = await Movie.findByPk(id, {
        include: [
          { model: Author, attributes: ["username", "role"] },
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PublicController;
