const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const dataRouter = require("./appData")

router.use("/users", userRouter)
router.use("/private", dataRouter);

module.exports = router;
