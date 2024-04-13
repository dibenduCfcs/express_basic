const express = require("express");
const { UserLogin } = require("../../models/users");
const { loginUserRepo } = require("../../repository/userRepo");
const userRouter = express.Router();

userRouter.post("/login", (req, res, next) => {
  try {
    let bodyValidation = UserLogin.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      loginUserRepo(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
