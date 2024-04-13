const express = require("express");
const {
  AddUpdateCategory,
  GetCategoryListAdmin,
  AddUpdateSubCategory,
  GetSubCategoryListAdmin,
  DeleteSubCat_CategoryByIdAdmin,
} = require("../../models/category");
const {
  addUpdateCategoryRepo,
  getAllCategoryListAdmin,
  addUpdateSubCategoryRepo,
  getAllSubCategoryListAdmin,
  deleteCategoryById,
} = require("../../repository/categoryRepo");
const categoryRouter = express.Router();

categoryRouter.post("/Admin/AddCategory", (req, res, next) => {
  try {
    let bodyValidation = AddUpdateCategory.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      addUpdateCategoryRepo(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});
categoryRouter.post("/Admin/AddSubCategory", (req, res, next) => {
  try {
    let bodyValidation = AddUpdateSubCategory.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      addUpdateSubCategoryRepo(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/Admin/GetCategoryList", (req, res, next) => {
  try {
    let bodyValidation = GetCategoryListAdmin.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      getAllCategoryListAdmin(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/Admin/GetSubCategoryList", (req, res, next) => {
  try {
    let bodyValidation = GetSubCategoryListAdmin.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      getAllSubCategoryListAdmin(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/Admin/DeleteCategoryById", (req, res, next) => {
  try {
    let bodyValidation = DeleteSubCat_CategoryByIdAdmin.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      deleteCategoryById(req, res, next, true);
    }
  } catch (error) {
    next(error);
  }
});
categoryRouter.post("/Admin/DeleteSubCategoryById", (req, res, next) => {
  try {
    let bodyValidation = DeleteSubCat_CategoryByIdAdmin.validate(req.body);
    if (bodyValidation.error) {
      next(bodyValidation.error.details[0]);
    } else {
      deleteCategoryById(req, res, next, false);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;
