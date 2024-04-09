const express = require("express");
const globalRouter = express.Router();
const studentRouter = require("../controllers/students");
const coursesRouter = require("../controllers/courses");

globalRouter.use("/students", studentRouter);
globalRouter.use("/courses", coursesRouter);

module.exports = globalRouter;
