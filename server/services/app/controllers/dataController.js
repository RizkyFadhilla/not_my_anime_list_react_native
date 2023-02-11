const editSlug = require("../helpers/slug");
const { sequelize } = require("../models");
let { Author, Movie, Cast, Genre } = require("../models");
class DataController {
  static async FetchAllData(req, res, next) {
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
  static async FetchOneData(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Movie.findByPk(id, {
        include: [
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async FetchGenreData(req, res, next) {
    try {
      let data = await Genre.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async AddData(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log(req.body);
      let { data, cast } = req.body;
      let { title, synopsis, rating, trailerUrl, imgUrl, GenreId, MongoDBId } =
        data;
      let newMovie = await Movie.create(
        {
          title,
          synopsis,
          rating,
          trailerUrl,
          imgUrl,
          MongoDBId,
          GenreId,
        },
        { transaction: t }
      );
      let newCastList = cast.map((element) => {
        return {
          name: element.castName,
          MovieId: newMovie.id,
          profilePict: element.castImgUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await Cast.bulkCreate(newCastList, { transaction: t });
      await t.commit();
      res.status(201).json({ message: "add Data Success" });
    } catch (error) {
      next(error);
      await t.rollback();
    }
  }
  static async deleteMovies(req, res, next) {
    try {
      let id = req.params.id;
      let findData = Movie.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await Movie.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteGenre(req, res, next) {
    try {
      let id = req.params.id;
      console.log(id);
      let findData = Genre.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      console.log(findData);
      await Genre.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      let { name } = req.body;
      await Genre.create({
        name,
      });
      res.status(201).json({ message: "Add Genre Success" });
    } catch (error) {
      next(error);
    }
  }

  static async GenreByID(req, res, next) {
    try {
      let id = req.params.id;
      let findData = await Genre.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(200).json(findData);
    } catch (error) {
      next(error);
    }
  }
  static async EditGenreData(req, res, next) {
    try {
      let id = req.params.id;
      let { name } = req.body;
      let findData = await Genre.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await Genre.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: "edit Genre Success" });
    } catch (error) {
      next(error);
    }
  }
  static async EditAnimeData(req, res, next) {
    console.log(req.body)
    try {
      let id = req.params.id;
      let findData = await Movie.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let { title, synopsis, rating, trailerUrl, imgUrl, GenreId, MongoDBId } =
        req.body;
      await Movie.update(
        {
          title,
          slug: editSlug(title),
          synopsis,
          rating,
          trailerUrl,
          imgUrl,
          MongoDBId,
          GenreId,
        }, {
          where:{
            id
          }
        }
      );
      res.status(201).json({ message: "Edit Data Success" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DataController;
