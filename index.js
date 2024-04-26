const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require('cors')
const app = express();
const globalRouter = require("./route");
const errorhandler = require("./utils/errorhandler");
const mongoose  = require("mongoose");
const { connectionString } = require("./constants");

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
    dotenv.config({ path: '.env.prod' });
    app.use(express.static("static/prod"))
} else {
    dotenv.config({ path: '.env.dev' });
    app.use(express.static("static/dev"))
}

let _connectionString = process.env.Db_Connection_String || connectionString.collegeErp_server;
mongoose.connect(_connectionString);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({limit:'1gb'}));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

app.get("/", (req, res) => {
  res.json({ message: "API is Working." });
});

app.use("/api/v1", globalRouter);

app.use(errorhandler);
