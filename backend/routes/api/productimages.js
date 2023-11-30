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
} = require("../../aws_config");

// Get all productImage
router.get("/all", async (req, res) => {
  try {
    const productImage = await ProductImage.findAll();
    res.json({ data: productImage });
  } catch (err) {
    return internalServerError(res, err);
  }
});

// router.post("/", singleMulterUpload("image"), async (req, res) => {
//   try {
//     const { productId } = req.body;

//     // Create product
//     const product = await Product.findOne({
//       where: {
//         productId: req.product.id,
//       },
//     });

//     if (!product) {
//       return notFoundError(res, "Product");
//     }

//     // Create product images and associate with the product
//     const imageUrl = await singlePublicFileUpload(req.file);
//     const image = await ProductImage.create({
//       productId: productId,
//       image: imageUrl,
//     });

//     return res.status(201).json({ image });
//   } catch (error) {
//     console.error(error);
//     return internalServerError(res, error);
//   }
// });

router.post("/", singleMulterUpload("images"), async (req, res) => {
  try {
      const { productId } = req.body;

      // Create product images and associate with the product
      const imageUrls = await multiplePublicFileUpload(req.files);
      const productImages = await Promise.all(
          imageUrls.map(async (imageUrl) => {
              return await ProductImage.create({
                  productId: productId,
                  image: imageUrl,
              });
          })
      );

      return res.status(201).json({ productImages });
  } catch (error) {
      console.error(error);
      return internalServerError(res, error);
  }
});



module.exports = router;
