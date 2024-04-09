const express = require("express");
const { UserLogin, addNewUser } = require("../../models/student");
const {
  generateJWTToken,
  verifyJWTToken,
  rngfc,
} = require("../../utils/commonFunction");
const {
  addNewUserRepo,
  loginRepo,
  getProfileDetailRepo,
} = require("../../repository/studentRepo");
const connectDb = require("../../database");
const studentRouter = express.Router();
const students = [];
studentRouter.get("/", (req, res) => {
  let sortBy = req.query.sortBy;
  if (sortBy === "1") {
    res.json({ message: "API is Working.", data: [1, 2, 3, 4, 5, 6] });
  } else {
    res.json({ message: "API is Working.", data: [6, 5, 4, 3, 2, 1] });
  }
});

studentRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  res.json({ message: "API is Working.", data: { id: id } });
});

studentRouter.post("/", (req, res) => {
  let name = req.body.name;
  res.json({ message: `post request  with name :${name}` });
});

studentRouter.post("/createNewUser", async (req, res, next) => {
  let bodyValidate = addNewUser.validate(req.body);
  if (bodyValidate.error) {
    return next(error);
  }

  addNewUserRepo(req, res, next);
});

studentRouter.post("/login", async (req, res, next) => {
  let bodyValidate = UserLogin.validate(req.body);
  if (bodyValidate.error) {
    return res.status(200).json({
      meta: {
        status_code: 0,
        status_message: bodyValidate.error.details[0].message,
      },
    });
  }
  loginRepo(req, res, next);
});

studentRouter.post("/getProfileDetail", (req, res, next) => {
  getProfileDetailRepo(req, res, next);
});

module.exports = studentRouter;
