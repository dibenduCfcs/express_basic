const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();
const globalRouter = require("./route");
const errorhandler = require("./utils/errorhandler");
const { connectionString } = require("./constants");
const mongoose  = require("mongoose");

mongoose.connect(connectionString.collegeErp_server);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

app.get("/", (req, res) => {
  res.json({ message: "API is Working." });
});

app.use("/api/v1", globalRouter);

app.use(errorhandler);
