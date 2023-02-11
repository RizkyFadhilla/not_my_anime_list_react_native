"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cast.belongsTo(models.Movie);
    }
  }
  Cast.init(
    {
      MovieId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Fill the Character name",
          },
          notEmpty: {
            msg: "Please Fill the Character name",
          },
        },
      },
      profilePict: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cast",
    }
  );
  return Cast;
};
