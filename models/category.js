const Joi = require("joi");
const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  catName: String,
  catImage: String,
  activeStatus: String,
});

const subCategorySchema = new Schema({
  subCatName: String,
  catId: String,
  activeStatus: String,
});

const CategoryModal = model("Category", categorySchema);
const SubCategoryModal = model("SubCategory", subCategorySchema);

const AddUpdateCategory = Joi.object({
  catId: Joi.string().required(),
  catName: Joi.string().min(5).max(30).required(),
  catImage: Joi.string().required(),
  activeStatus: Joi.boolean().required(),
});

const AddUpdateSubCategory = Joi.object({
  subCatId: Joi.string().required(),
  catId: Joi.string().required(),
  subCatName: Joi.string().min(5).max(30).required(),
  activeStatus: Joi.boolean().required(),
});

const GetCategoryListAdmin = Joi.object({
  catId: Joi.string().required().allow(""),
  search: Joi.string().allow(""),
  paging: Joi.object({
    pageNo: Joi.number().required(),
    pageSize: Joi.number().required(),
  }),
});

const GetSubCategoryListAdmin = Joi.object({
  catId: Joi.string().required().allow(""),
  search: Joi.string().allow(""),
  paging: Joi.object({
    pageNo: Joi.number().required(),
    pageSize: Joi.number().required(),
  }),
});

const DeleteSubCat_CategoryByIdAdmin = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  AddUpdateCategory,
  AddUpdateSubCategory,
  GetCategoryListAdmin,
  GetSubCategoryListAdmin,
  DeleteSubCat_CategoryByIdAdmin,
  CategoryModal,
  SubCategoryModal,
};
