"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.hasMany(models.Movie);
      // define association here
    }
  }
  Author.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Please Fill the email",
          },
          notEmpty: {
            msg: "Please Fill the email",
          },
          isEmail: {
            msg: "Please Fill with email Format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please Fill the Password",
          },
          notEmpty: {
            msg: "Please Fill the Password",
          },
          len: {
            args: [5],
            msg: "Password minimal 5 character",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      Address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  Author.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password);
  });
  return Author;
};
