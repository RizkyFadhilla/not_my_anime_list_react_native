const { baseUserUrl } = require("../url/index");
const axios = require("axios");
const redis = require("../config/redis");

class UserController {
  static async getAllUser(req, res) {
    try {
      const allUser = await redis.get("user-mongodb:allUser");
      if (allUser) {
        const data = JSON.parse(allUser);
        console.log("ini di redis");
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(baseUserUrl);
        console.log("ini dari else");
        await redis.set("user-mongodb:allUser", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUserById(req, res) {
    try {
      let id = req.params.id;
      const OneUser = await redis.get(`user-mongodb:OneUser/${id}`);
      if (OneUser) {
        const data = JSON.parse(OneUser);
        console.log("ini di redis");
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(baseUserUrl + `/${id}`);
        console.log("ini dari else");
        await redis.set(`user-mongodb:OneUser/${id}`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createNewUser(req, res) {
    try {
      let inputData = req.body;
      console.log(inputData);
      const { data } = await axios.post(baseUserUrl, inputData);
      await redis.del("user-mongodb:allUser");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      let id = req.params.id;
      const { data } = await axios.delete(baseUserUrl + `/${id}`);
      await redis.del("user-mongodb:allUser");
      await redis.del(`user-mongodb:OneUser/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = UserController;
