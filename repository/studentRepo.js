const mongoose = require("mongoose");
const { connectionString } = require("../constants");
const { generateJWTToken, verifyJWTToken } = require("../utils/commonFunction");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  mobile: String,
  token: String,
});
const User = mongoose.model("User", userSchema);

const addNewUserRepo = async (req, res, next) => {
  try {
    let { username, password, name, email, mobile } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    const user = await User.findOne({ username, password });
    console.log(user);
    if (user) {
      return res.status(200).json({
        meta: {
          status_code: 0,
          status_message: "User already exists.",
        },
      });
    }

    await User.insertMany([
      {
        name,
        username,
        password,
        email,
        mobile,
      },
    ]);

    const responseData = await User.find({});

    return res.status(200).json({
      meta: {
        status_code: 1,
        status_message: "New user add Successfully.",
      },
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const loginRepo = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    const user = await User.findOne({ username, password });
    console.log(user);
    if (Object.keys(user).length === 0) {
      return res.status(200).json({
        meta: {
          status_code: 0,
          status_message: "Either username or password is wrong.",
        },
      });
    }
    let token = generateJWTToken(user._id);
    let x = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { token: token } }
      //   { new: true }
    );
    console.log(x);
    return res.status(200).json({
      meta: {
        status_code: 1,
        status_message: "User Login Successfully.",
      },
      data: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfileDetailRepo = async (req, res, next) => {
  let { authorization } = req.headers;
  let token = authorization.replace("Bearer", "").trim();
  try {
    let { userId } = verifyJWTToken(token);
    mongoose.connect(connectionString.collegeErp_server);
    const user = await User.findOne({ _id: userId, token }).select({
      _id: 1,
      name: 1,
      username: 1,
      email: 1,
      mobile: 1,
    });
    if (!user) {
      return res.status(200).json({
        meta: {
          status_code: 10,
          status_message: "Session Expired.",
        },
      });
    } else {
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "User Profile Fetch Successfully.",
        },
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { addNewUserRepo, loginRepo, getProfileDetailRepo };
