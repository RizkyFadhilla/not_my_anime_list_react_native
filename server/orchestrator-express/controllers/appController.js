const axios = require("axios");
const redis = require("../config/redis");
const { baseAppUrl,baseUserUrl } = require("../url");

class DataController {
  static async FetchAllData(req, res) {
    try {
      const allData = await redis.get("app:allData");
      if (allData) {
        const data = JSON.parse(allData);
        console.log("ini di redis");
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(baseAppUrl + `/private/anime`);
        console.log("ini dari else");
        await redis.set("app:allData", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async FetchOneData(req, res) {
    try {
      let id = req.params.id;
      const OneData = await redis.get(`app:OneData/${id}`);
      if (OneData) {
        const data = JSON.parse(OneData);
        console.log("ini di redis");
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(baseAppUrl + `/private/anime/${id}`);
        let userId = data.MongoDBId;
        const response = await axios.get(baseUserUrl + `/${userId}`);
        data.user = response.data;
        console.log("ini dari else");
        await redis.set(`app:OneData/${id}`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async FetchGenreData(req, res) {
    try {
      const allGenre = await redis.get("app:allGenre");
      if (allGenre) {
        const genre = JSON.parse(allGenre);
        console.log("ini di redis");
        res.status(200).json(genre);
      } else {
        const { data } = await axios.get(baseAppUrl + `/private/genre`);
        console.log("ini dari else");
        await redis.set("app:allGenre", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async GenreByID(req, res) {
    try {
      let id = req.params.id;
      const OneGenre = await redis.get(`app:OneGenre/${id}`);
      if (OneGenre) {
        const genre = JSON.parse(OneGenre);
        console.log("ini di redis");
        res.status(200).json(genre);
      } else {
        const { data } = await axios.get(baseAppUrl + `/private/genre/${id}`);
        console.log("ini dari else");
        await redis.set(`app:OneGenre/${id}`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async AddData(req, res) {
    try {
      console.log(req.body);
      let { data, cast } = req.body.addData;
      const response = await axios.post(baseAppUrl + `/private/data`, {
        data,
        cast,
      });
      await redis.del("app:allData");
      res.status(201).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  static async addGenre(req, res) {
    try {
      const response = await axios.post(
        baseAppUrl + `/private/genre`,
        req.body
      );
      await redis.del("app:allGenre");
      console.log(response.data);
      res.status(201).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteMovies(req, res) {
    try {
      let id = req.params.id;
      const response = await axios.delete(baseAppUrl + `/private/anime/${id}`);
      await redis.del("app:allData");
      await redis.del(`app:OneData/${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteGenre(req, res) {
    try {
      let id = req.params.id;
      const response = await axios.delete(baseAppUrl + `/private/genre/${id}`);
      await redis.del("app:allGenre");
      await redis.del(`app:OneGenre/${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  static async EditGenreData(req, res) {
    try {
      let id = req.params.id;
      let { name } = req.body;
      const { data } = await axios.put(baseAppUrl + `/private/genre/${id}`, {
        name: name,
      });
      await redis.del("app:allGenre");
      await redis.del(`app:OneGenre/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async EditAnimeData(req, res) {
    try {
      let id = req.params.id;
      let { editData } = req.body;
      const { data } = await axios.put(
        baseAppUrl + `/private/anime/${id}`,
        editData
      );
      await redis.del("app:allData");
      await redis.del(`app:OneData/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = DataController;
