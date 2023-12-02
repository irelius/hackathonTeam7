const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { ProductImage } = require("../../db/models");
const { Product } = require("../../db/models");
const { internalServerError, notFoundError } = require("../../utils/errorFunc");
const {
  singlePublicFileUpload,
  singleMulterUpload,
  multiplePublicFileUpload,
  multipleMulterUpload,
} = require("../../awsS3");
const { isAdmin } = require("../../utils/authorization");

// Get all productImage
router.get("/all", async (req, res) => {
  try {
    const productImage = await ProductImage.findAll();
    res.json({ data: productImage });
  } catch (err) {
    return internalServerError(res, err);
  }
});

// get all product image by product id
router.get("/product/:productId", restoreUser, requireAuth, async (req, res) => {
  try {
    // const productId = req.params.productId;
    const productImages = await ProductImage.findAll({
      where: {
        productId: req.params.productId
      }
    });

    if (!productImages) {
      return res.status(404).json({ message: "Product image not found"})
    }

    return res.json({data: productImages});
  } catch (error) {
    console.error('Error retrieving product image:', error);
    return res.status(500).json({ message: 'Internal server error'})
  }
})

router.post(
  "/:productId",
  restoreUser,
  requireAuth,
  singleMulterUpload("image"),
  async (req, res) => {
    try {
      const { productId } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        return notFoundError(res, "Product");
      }

      const imageUrl = await singlePublicFileUpload(req.file);
      await ProductImage.create({
        productId: productId,
        image: imageUrl,
      });

      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      return internalServerError(res, error);
    }
  }
);

module.exports = router;
