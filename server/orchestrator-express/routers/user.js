const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController")

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createNewUser);
router.delete("/:id", UserController.deleteUser);
module.exports = router