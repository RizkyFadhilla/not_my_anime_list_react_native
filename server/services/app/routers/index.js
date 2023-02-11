const express = require("express");
const UserController = require("../controllers/userController");
const ErrorHandler = require("../middlewares/errorhandler");
const router = express.Router();
const movieRouter = require("./public");
const dataRouter = require("./data");
const Authentication = require("../middlewares/authentication");

router.use("/movies/public/", movieRouter);
// router.post("/login", UserController.Login);
router.use("/private", dataRouter);

router.use(ErrorHandler);

module.exports = router;
