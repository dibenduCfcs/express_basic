const express = require("express");
const globalRouter = express.Router();
const studentRouter = require("../controllers/students");
const coursesRouter = require("../controllers/courses");
const userRouter = require("../controllers/users");
const categoryRouter = require("../controllers/category");
const productRouter = require("../controllers/product");

globalRouter.use("/students", studentRouter);
globalRouter.use("/courses", coursesRouter);
globalRouter.use("/users", userRouter);
globalRouter.use("/category", categoryRouter);
globalRouter.use("/product", productRouter);

module.exports = globalRouter;
