// const mongoose = require("mongoose");
const { connectionString } = require("../constants");

const connectDb = async () => {
  try {
    let response = await mongoose.connect(connectionString.collegeErp, {});
    console.log(response);
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports = connectDb;
