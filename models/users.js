const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  token: String,
});

const UserModal = model("Users", userSchema);

const UserLogin = Joi.object({
  mobileNumber: Joi.string().min(10).max(10).required(),
});

module.exports = { UserLogin, UserModal };
