"use strict";
const { Model } = require("sequelize");
const slug = require("slug");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Movie.belongsTo(models.Author);
      Movie.belongsTo(models.Genre);
      Movie.hasMany(models.Cast);
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Fill the Title",
          },
          notEmpty: {
            msg: "Please Fill the Title",
          },
        },
      },
      slug: DataTypes.STRING,
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Fill the Synopsis",
          },
          notEmpty: {
            msg: "Please Fill the Synopsis",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Fill the rating",
          },
          notEmpty: {
            msg: "Please Fill the rating",
          },
          min: {
            args: 1,
            msg: "Rating Minimum 1",
          },
        },
      },
      GenreId: DataTypes.INTEGER,
      AuthorId: DataTypes.INTEGER,
      MongoDBId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((instance, option) => {
    instance.slug = slug(instance.title);
  });
  return Movie;
};
