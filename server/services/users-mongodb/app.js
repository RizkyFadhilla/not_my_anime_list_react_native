if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4001;
const router = require("./routers/index");
const { connect } = require("./config/mongo-connection");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
  // console.log(data);
});
