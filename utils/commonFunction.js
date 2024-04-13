const jwt = require("jsonwebtoken");
const coursesRepo = require("../repository/coursesRepo");
const { singingKey } = require("../constants");

const rngfc = () => {
  let number = Math.floor(Math.random() * 9000) + 1000;
  let findIndex = coursesRepo.findIndex((item) => item._id === number);
  if (findIndex !== -1) {
    return rngfc();
  } else {
    return number;
  }
};

const validateBody = (req, type) => {
  const requestBody = req.body;
  const keys = Object.keys(type);

  for (let key of keys) {
    if (typeof requestBody[key] !== type[key]) {
      return false;
    }
  }
  return true;
};

const generateJWTToken = (_payload) => {
  let payload = { ..._payload };
  return jwt.sign(payload, singingKey, {
    algorithm: "HS256",
    expiresIn: "24 hrs",
    allowInsecureKeySizes: false,
    allowInvalidAsymmetricKeyTypes: false,
    issuer: "dibendugorai",
  });
};

const verifyJWTToken = (token) => {
  return jwt.verify(token, singingKey, {
    algorithm: "HS256",
    issuer: "dibendugorai",
    ignoreExpiration: false,
  });
};

module.exports = { rngfc, validateBody, generateJWTToken, verifyJWTToken };
