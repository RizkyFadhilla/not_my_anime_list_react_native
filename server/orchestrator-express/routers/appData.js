const express = require("express");
const router = express.Router();
const DataController = require("../controllers/appController")

router.get("/anime", DataController.FetchAllData);
router.get("/anime/:id", DataController.FetchOneData);
router.put("/anime/:id", DataController.EditAnimeData);
router.delete("/anime/:id", DataController.deleteMovies);
router.post("/data", DataController.AddData);
router.get("/genre", DataController.FetchGenreData);
router.post("/genre", DataController.addGenre);
router.get("/genre/:id", DataController.GenreByID);
router.put("/genre/:id", DataController.EditGenreData);
router.delete("/genre/:id", DataController.deleteGenre);

module.exports = router