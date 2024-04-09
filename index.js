const express = require("express");
const morgan = require("morgan");
const app = express();
const globalRouter = require("./route");
const errorhandler = require("./utils/errorhandler");
const connectDb = require("./database");

connectDb()
  .then((res) => {
    console.log("Connected..");
  })
  .catch(() => {
    console.log("Error..");
  });

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
