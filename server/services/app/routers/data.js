const express = require("express");
const DataController = require("../controllers/dataController");
const UserController = require("../controllers/userController");
const Authorization = require("../middlewares/authorization");
const router = express.Router();

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
router.post("/register", UserController.Register);

module.exports = router;
