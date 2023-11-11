const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Category, ProductCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { route } = require('./products');


// Get all productCategories
router.get("/all", async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: productCategory })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all productCategories based on productId
router.get('/product/:productId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            where: {
                productId: req.params.productId
            }
        })

        res.json({ data: productCategory })

    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all productCategories based on categoryId
router.get('/category/:categoryId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            where: {
                categoryId: req.params.categoryId
            }
        })

        res.json({ data: productCategory })

    } catch (err) {
        return internalServerError(res, err)
    }
})

// get a productCategory based on product and category id
router.get('/product/:productId/category/:categoryId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            where: {
                productId: req.params.productId,
                categoryId: req.params.categoryId
            }
        })
        res.json({ data: productCategory })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get a productCategory based on productCategory id
router.get('/:productCategoryId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.productCategoryId)

        if(!productCategory) {
            return notFoundError(res, "Product Category")
        }

        res.json({ data: productCategory })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// create a new productCategory
// will create a new product category between a product Id and for each category passed in
router.post("/", restoreUser, requireAuth, isAdmin, async (req, res) => {
    let { productId, categories } = req.body // categories is by default a string. Ex: "Black,Indoor"

    // prep the categories. add "All" as a category as every product will be counted under the "All" category
    if (categories.trim().length === 0) {
        categories = "All"
    } else {
        categories += ",All"
    }
    const categoryNames = categories.split(',')

    let newPCs = []

    try {
        for (let i = 0; i < categoryNames.length; i++) { // cycle through each category and create a new pairing
            let curr = categoryNames[i]
            const categoryId = await Category.findOne({
                where: {
                    categoryName: curr
                },
                attributes: ["id"]
            })

            const newProductCategory = await ProductCategory.create({
                productId: productId,
                categoryId: categoryId.id
            })


            newPCs.push(newProductCategory)
        }

        res.status(201).json({ data: newPCs })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// edit the product categories of a product
router.put('/:productId', restoreUser, requireAuth, isAdmin, async (req, res) => {
    const { categories } = req.body
    const productId = req.params.productId

    const categoryNames = categories.split(",")

    try {
        ProductCategory.destroy({
            where: {
                productId: productId,
            },
        });

        for (let i = 0; i < categoryNames.length; i++) {
            let curr = categoryNames[i]

            const categoryId = await Category.findOne({
                where: {
                    categoryName: curr
                }
            })

            await ProductCategory.create({
                productId: productId,
                categoryId: categoryId.id
            })
        }

        const returnPCs = await ProductCategory.findAll({
            where: {
                productId: productId
            }
        })

        res.status(201).json({ data: returnPCs })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// delete a productCategory
router.delete("/:productCategoryId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.productCategoryId)
        if (!productCategory) {
            return notFoundError(res, "Product Category")
        }

        await productCategory.destroy()
        res.status(200).json({ message: "Product Category successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
