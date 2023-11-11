const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { Op, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Product, Category, ProductCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');


// Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json({ data: products })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get a product by name
router.get("/:productName", async (req, res) => {
    let { productName } = req.params
    if (productName.includes('%20')) productName = productName.split('%20').join(' ')
    try {
        const product = await Product.findOne({
            where: {
                productName: productName
            }
        })
        if (!product) {
            return notFoundError(res, "Product")
        }
        res.json({ data: product })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get a product by category and by filter type
    //'or' will, if given multiple categories, return all products of ANY of the categories
    //'and' will, if given multiple categories, return all products of ALL of the categories
    //'none' will, if given multiple categories, return all products of NON of the categories
// example url for testing: http://localhost:8000/api/product/filter?categories=Black,Indoor&type=or
router.get("/filter", async (req, res) => {
    try {
        // set default categories to "All" if none are passed in
        let categories = "All"
        if (req.query.categories) {
            categories = req.query.categories
        }
        const categoryNames = categories.split(','); // Split the category names by commas

        // set default type filter to "or" if none are passed in
        let type = "or"
        if (req.query.type) {
            type = req.query.type
        }

        // filter for "or"
        if (type === "or") {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        required: true,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        where: {
                            categoryName: {
                                [Op.or]: categoryNames
                            }
                        },
                        through: { attributes: [] } // Removes ProductCategory as it is redundant information
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });

            res.json({ data: products });

            // filter for "none"
        } else if (type === "none") {
            // return res.json(products)
            const productIds = await Product.findAll({
                attributes: ['id'],
                include: {
                    model: Category,
                    where: {
                        categoryName: categoryNames,
                    },
                    attributes: [],
                    through: { attributes: [] },
                },
                raw: true,
            });

            const excludedProductIds = productIds.map((product) => product.id);

            const products = await Product.findAll({
                where: {
                    id: {
                        [Op.notIn]: excludedProductIds,
                    },
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: Category,
                    through: { attributes: [] }, // Removes ProductCategory as it is redundant information
                },
            });
            res.json({ data: products })

            // return for "and"
        } else if (type === "and") {
            const categoryIds = await Category.findAll({
                where: {
                    categoryName: categoryNames,
                },
                attributes: ['id'],
            });

            const andProducts = await Product.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: ProductCategory,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: {
                        categoryId: {
                            [Op.in]: categoryIds.map(category => category.id),
                        },
                    },
                },
                group: ['Product.id'], // Group by product to ensure products are associated with all specified categories.
                having: Sequelize.where(Sequelize.fn('count', Sequelize.col('ProductCategories.categoryId')), '=', categoryIds.length), // Ensure all specified categories are associated.
            });

            return res.json({ data: andProducts });
        }

    } catch (err) {
        return internalServerError(res, err);
    }
})


// create a new product to list
router.post("/", restoreUser, requireAuth, isAdmin, async (req, res) => {
    const { productName, productDescription, productPrice, quantity } = req.body

    try {
        const newProduct = await Product.create({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            quantity: quantity
        })

        res.status(201).json({ data: newProduct })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// update a product's quantity
router.put("/:productId/quantity", restoreUser, requireAuth, async (req, res) => {
    try {
        const productId = req.params.productId
        const { quantity } = req.body.quantity

        const product = await Product.findByPk(productId)

        if (!product) {
            return notFoundError(res, "Product")
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient quantity of product." })
        }

        product.quantity += quantity;
        await product.save()

        return res.json({ message: "Purchase successful" })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// update a product's information
router.put("/:productId/info", restoreUser, requireAuth, isAdmin, async (req, res) => {
    const productId = req.params.productId
    // const { productName, productDescription, productPrice } = req.body.productInfo;
    const { productName, productDescription, productPrice } = req.body;

    try {

        const product = await Product.findByPk(productId)

        if (!product) {
            return notFoundError(res, "Product")
        }

        product.productName = productName
        product.productDescription = productDescription
        product.productPrice = productPrice

        await product.save()
        return res.json({ message: "Successfully updated product information" })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// delete a product by id
router.delete("/:productId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId)

        if (!product) {
            return notFoundError(res, "Product")
        }

        await product.destroy()

        res.status(200).json({ message: "Product successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})



module.exports = router
