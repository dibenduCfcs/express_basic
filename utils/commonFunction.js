const jwt = require("jsonwebtoken");
const coursesRepo = require("../repository/coursesRepo");
const singingKey = process.env.SingingKey;
const fs = require('fs');
const path = require('path');
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

const base64Save = (base64Data,name,pathName) => {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const filename = `${name}.png`;

  const directoryPath = path.join( pathName);
  const filePath = path.join(directoryPath, filename);


  if (!fs.existsSync(directoryPath)){
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
    if (err) {
      console.error(err);
      
    } else {
      console.log('Image saved successfully:', filename);
     
    }
  });
}

const generateUniqueFileName=(originalFileName)=> {
  const timestamp = Date.now(); // Get current timestamp
  const uniqueIdentifier = Math.random().toString(36).substring(7); // Generate random string
  return `${uniqueIdentifier}_${timestamp}`; // Combine parts to form unique file name
}

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';

module.exports = { rngfc,
   validateBody,
    generateJWTToken,
     verifyJWTToken,
     base64Save ,
     generateUniqueFileName,
     isProduction,
     isDevelopment};
