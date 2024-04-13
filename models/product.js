const Joi = require("joi");
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: String,
  detailDescription: String,
  shortDescription: String,
  slug: String,
  price: Number,
  discount: Number,
  sku: String,
  netWeight: Number,
  unitId: String,
  catId: String,
  subCatId: String,
  productImages: [],
  video: String,
  activeStatus: Boolean,
  pageTitle: String,
  pageMetaDescription: String,
});

const ProductModal = model("Product", productSchema);

const AddUpdateProduct = Joi.object({
  productId: Joi.string().required().allow(""),
  productName: Joi.string().required(),
  detailDescription: Joi.string().required().allow(""),
  shortDescription: Joi.string().required().allow(""),
  slug: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().required(),
  sku: Joi.string().required(),
  netWeight: Joi.number().required(),
  unitId: Joi.string().required(),
  catId: Joi.string().required(),
  subCatId: Joi.string().required(),
  productImages: Joi.array().required(),
  video: Joi.string().required().allow(""),
  activeStatus: Joi.boolean().required(),
  pageTitle: Joi.string().required().allow(""),
  pageMetaDescription: Joi.string().required().allow(""),
});

module.exports = { ProductModal, AddUpdateProduct };
