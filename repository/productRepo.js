const mongoose = require("mongoose");
const { connectionString } = require("../constants");
const { ProductModal } = require("../models/product");

const addUpdateProductRepo = async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      detailDescription,
      shortDescription,
      slug,
      price,
      discount,
      sku,
      netWeight,
      unitId,
      catId,
      subCatId,
      productImages,
      video,
      activeStatus,
      pageTitle,
      pageMetaDescription,
    } = req.body;
    mongoose.connect(connectionString.collegeErp_server);
    if (productId === "") {
      const product = await ProductModal.insertMany([
        {
          productName,
          detailDescription,
          shortDescription,
          slug,
          price,
          discount,
          sku,
          netWeight,
          unitId,
          catId,
          subCatId,
          productImages,
          video,
          activeStatus,
          pageTitle,
          pageMetaDescription,
        },
      ]);

      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Product Added Successfully.",
        },
        data: product,
      });
    } else {
      const product = await ProductModal.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
            productName,
            detailDescription,
            shortDescription,
            slug,
            price,
            discount,
            sku,
            netWeight,
            unitId,
            catId,
            subCatId,
            productImages,
            video,
            activeStatus,
            pageTitle,
            pageMetaDescription,
          },
        }
      );
      return res.status(200).json({
        meta: {
          status_code: 1,
          status_message: "Product Updated Successfully.",
        },
        data: { list: product },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { addUpdateProductRepo };
