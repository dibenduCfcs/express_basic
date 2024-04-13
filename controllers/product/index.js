const express = require("express");
const { AddUpdateProduct } = require("../../models/product");
const { addUpdateProductRepo } = require("../../repository/productRepo");
const productRouter = express.Router();

productRouter.post("/AddUpdateProducts", (req, res, next) => {
  try {
    let bodyValidation = AddUpdateProduct.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      addUpdateProductRepo(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
