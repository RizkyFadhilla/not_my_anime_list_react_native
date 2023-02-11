const express = require("express");
const UserController = require("../controllers.js/userController");
const router = express.Router();

router.get("/users", UserController.getAllUser);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createNewUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
