const Joi = require("joi");

const addNewStudent = Joi.object({
  course_name: Joi.string().min(3).max(25).required(),
  branch_name: Joi.string().min(3).max(25).required(),
  year: Joi.string().min(3).max(3).required(),
  sem: Joi.string().min(3).max(4).required(),
});

const addNewUser = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  username: Joi.string().min(8).max(25).required(),
  password: Joi.string().min(8).max(25).required(),
  email: Joi.string().min(5).max(25).email().required(),
  mobile: Joi.string().min(10).max(10).required(),
});

const UserLogin = Joi.object({
  username: Joi.string().min(8).max(25).required(),
  password: Joi.string().min(8).max(25).required(),
});

module.exports = { addNewStudent, addNewUser, UserLogin };
