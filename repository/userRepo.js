const mongoose = require("mongoose");
const { UserModal } = require("../models/users");
const { connectionString } = require("../constants");
const { generateJWTToken } = require("../utils/commonFunction");

const loginUserRepo = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    const user = await UserModal.findOne({ mobile: mobileNumber });
    if (user) {
      const token = generateJWTToken({ userId: user._id });
      await UserModal.findOneAndUpdate(
        { _id: user._id },
        { $set: { token: token } }
      );
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "User Login",
        },
        data: { token: token },
      });
    } else {
      const user = (await UserModal.insertMany([{ mobile: mobileNumber }])).at(
        0
      );
      const token = generateJWTToken({ userId: user._id });
      await UserModal.findOneAndUpdate(
        { _id: user._id },
        { $set: { token: token } }
      );
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "User Login",
        },
        data: { token: token },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUserRepo };
