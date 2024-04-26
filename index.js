const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require('cors')
const app = express();
const globalRouter = require("./route");
const errorhandler = require("./utils/errorhandler");
const { connectionString } = require("./constants");
const mongoose  = require("mongoose");

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
  // Run production-specific code here
  console.log('Running in production mode');
} else {
  // Run development-specific code here
  console.log('Running in development mode');
}


mongoose.connect(connectionString.collegeErp_server);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({limit:'1gb'}));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

app.use(express.static("public"));
app.use(express.static("static/dev"));

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

app.get("/", (req, res) => {
  res.json({ message: "API is Working." });
});

app.use("/api/v1", globalRouter);

app.use(errorhandler);
