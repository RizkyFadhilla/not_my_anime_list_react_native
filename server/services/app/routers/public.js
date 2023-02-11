const express = require("express");
const PublicController = require("../controllers/publicController");
const router = express.Router();

router.get("/", PublicController.fetchAllData);
router.get("/:movieId", PublicController.fetchOneData);

module.exports = router;
