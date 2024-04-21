const mongoose = require("mongoose");
const { connectionString } = require("../constants");
const { CategoryModal, SubCategoryModal } = require("../models/category");

const addUpdateCategoryRepo = async (req, res, next) => {
  try {
    const { catId, catName, catImage, activeStatus } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    console.log("first", catId);
    if (catId === "0000000000000000000000") {
      const category = await CategoryModal.insertMany([
        { catName, catImage, activeStatus },
      ]);

      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category Added Successfully.",
        },
        data: category,
      });
    } else {
      const category = await CategoryModal.findOneAndUpdate(
        { _id: catId },
        { $set: { catName, catImage, activeStatus } }
      );
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category Updated Successfully.",
        },
        data: { list: category },
      });
    }
  } catch (error) {
    next(error);
  }
};
const addUpdateSubCategoryRepo = async (req, res, next) => {
  try {
    const { subCatId, catId, subCatName, activeStatus } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    if (subCatId === "0000000000000000000000") {
      const category = await SubCategoryModal.insertMany([
        { catId, subCatName, activeStatus },
      ]);

      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Sub Category Added Successfully.",
        },
        data: category,
      });
    } else {
      const category = await SubCategoryModal.findOneAndUpdate(
        { _id: subCatId },
        { $set: { catId, subCatName, activeStatus } }
      );
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category Updated Successfully.",
        },
        data: { list: category },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getAllCategoryListAdmin = async (req, res, next) => {
  try {
    const { catId, search, paging } = req.body;
    const skip = paging.pageSize * (paging.pageNo - 1);
    mongoose.connect(connectionString.collegeErp_server);
    const query = search ? { catName: { $regex: new RegExp(search, 'i') } } : {};

    const totalCount = await CategoryModal.countDocuments(query);
    const categoryList = (
      await CategoryModal.find(query).skip(skip).limit(paging.pageSize)
    );
    const nextPageAvailable = (skip + categoryList.length) < totalCount;

    if (categoryList) {
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category List",
        },
        data: {pageNo:paging.pageNo, nextPageAvailable, noOfData:totalCount, data: categoryList },
      });
    } else {
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category  Successfully.",
        },
        data: {pageNo:paging.pageNo, nextPageAvailable, noOfData:totalCount, data: categoryList }
      });
    }
  } catch (error) {
    next(error);
  }
};
const getAllSubCategoryListAdmin = async (req, res, next) => {
  try {
    const { catId, search, paging } = req.body;
    const skip = paging.pageSize * (paging.pageNo - 1);
    mongoose.connect(connectionString.collegeErp_server);
    let findParams = catId === "" ? {} : { catId };
    const list = (
      await SubCategoryModal.find(findParams).skip(skip).limit(paging.pageSize)
    ).filter((item) => {
      return item.subCatName.includes(search);
    });
    if (list) {
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category List",
        },
        data: { list: list },
      });
    } else {
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Category  Successfully.",
        },
        data: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById = async (req, res, next, isCategory) => {
  try {
    mongoose.connect(connectionString.collegeErp_server);
    const { id } = req.body;
    let response = null;
    if (isCategory) {
      let checkSubCategory =
        (await SubCategoryModal.find({ catId: id })).length > 0;
      if (checkSubCategory) {
        return next({
          message: "SubCategory is Associated with this category.",
        });
      } else {
        response = await CategoryModal.deleteOne({ _id: id });
      }
    } else {
      response = await SubCategoryModal.deleteOne({ _id: id });
    }
    return res.status(200).json({
      meta: {
        status_code: 1,
        status_messsage: `${
          isCategory ? "Category" : "SubCategory"
        } is deleted Successfully.`,
      },
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUpdateCategoryRepo,
  addUpdateSubCategoryRepo,
  getAllCategoryListAdmin,
  getAllSubCategoryListAdmin,
  deleteCategoryById,
};
