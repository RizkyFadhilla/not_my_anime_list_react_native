  const UserDB = require("../models");

class UserController {
  static async getAllUser(req, res) {
    try {
      const response = await UserDB.getData();
      response.forEach((element) => delete element.password);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserById(req, res) {
    try {
      let id = req.params.id;
      const response = await UserDB.getDataById(id);
      // if (!response) {
      //   res.status(404).json({"message": "User Not Found"});
      // }
      let data = {
        _id:response._id,
        username: response.username,
        email: response.email,
        role: response.role,
        phoneNumber: response.phoneNumber,
        Address: response.Address,
      };
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async createNewUser(req, res) {
    try { 
      let { username, email, password, role, phoneNumber, Address } = req.body;
      const response = await UserDB.addUserBy(
        username,
        email,
        password,
        role,
        phoneNumber,
        Address
      );
      let newUser = await UserDB.getDataById(response.insertedId);
      let data = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        Address: newUser.Address,
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      let id = req.params.id;
      const findUser = await UserDB.getDataById(id);
      if (!findUser) {
        res.status(404).json({ message: "User Not Found" });
      }
      await UserDB.deleteUserInDb(id);
       let data = {
        _id: findUser._id,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
        phoneNumber: findUser.phoneNumber,
        Address: findUser.Address,
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = UserController;
