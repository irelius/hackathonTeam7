const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { Op, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Review, Product, Category, ProductCategory, ProductCart, ProductImage } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin, checkUser } = require('../../utils/authorization');


// Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: products })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all products, sorted by options
router.get("/all/sort", async (req, res) => {
    try {
        const { sortBy, sortOrder, startsWith } = req.query;

        const searchClause = startsWith && startsWith !== "All"
            ? {
                productName: {
                    [Op.startsWith]: startsWith.toUpperCase(),
                },
            }
            : {};

        const result = await Product.findAll({
            where: searchClause,
            order: [[sortBy, sortOrder]],
        });

        res.json({ data: result });
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get all products with name that starts with a letter
router.get("/all/:startingLetter", async (req, res) => {
    try {
        const startingLetter = req.params.startingLetter.toUpperCase();

        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                productName: {
                    [Sequelize.Op.like]: `${startingLetter}%`,
                },
            },
            order: [['productName', 'ASC']],
        });

        res.json({ data: products });
    } catch (err) {
        return internalServerError(res, err);
    }
})


// Get a product by name
router.get("/name/:productName", async (req, res) => {
    let { productName } = req.params

    // takes the value passed in parameter. If name of product isn't capitalized properly, capitalize it for query
    productName = productName.split("-")
    for (let i = 0; i < productName.length; i++) {
        let curr = productName[i].split('')
        curr[0] = curr[0].toUpperCase()
        productName[i] = curr.join("")
    }
    productName = productName.join(" ") // join productName array by a space


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

// Get a product by id
router.get("/id/:productId", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            attributes: { exclude: ["createdAt", "updatedAt"] }
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

        if (type === "or") { // filter for "or"
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

        } else if (type === "none") { // filter for "none"
            // return res.json(products)
            const productIds = await Product.findAll({
                attributes: ['id'],
                include: [
                    {
                        model: Category,
                        where: {
                            categoryName: categoryNames,
                        },
                        attributes: [],
                        through: { attributes: [] },
                    }
                ],
                raw: true,
            });

            const excludedProductIds = productIds.map((product) => product.id);

            const products = await Product.findAll({
                where: {
                    id: {
                        [Op.notIn]: excludedProductIds,
                    },
                },
                attributes: {
                    include: ["id"],
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    through: { attributes: [] }, // Removes ProductCategory as it is redundant information
                },
            });
            res.json({ data: products })

        } else if (type === "and") { // return for "and"
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
    const { productName, productDescription, productPrice, productQuantity } = req.body

    try {
        const newProduct = await Product.create({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productQuantity: productQuantity
        })

        res.status(201).json({ data: newProduct })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// update a product
router.put("/info/:productId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productId = req.params.productId
        const { productName, productDescription, productPrice, productQuantity } = req.body

        const product = await Product.findByPk(productId)

        if (!product) {
            return notFoundError(res, "Product")
        }

        product.productQuantity = productQuantity;
        product.productName = productName
        product.productDescription = productDescription
        product.productPrice = productPrice

        await product.save()

        return res.json({ message: "Successfully updated product information" })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// change product quantity when purchasing
router.put('/quantity/:productId', restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const productId = req.params.productId
        const { productQuantity } = req.body
        const product = await Product.findByPk(productId)

        if (!product) {
            return notFoundError(res, "Product")
        }

        if (product.productQuantity < productQuantity) {
            return res.status(400).json({ error: "Insufficient quantity of product." })
        }

        product.productQuantity -= productQuantity;

        await product.save()

        res.status(200).json({ data: product });
    } catch (err) {
        return internalServerError(res, err)
    }
})

// delete a product by id
router.delete("/:productId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productId = req.params.productId

        await ProductCategory.destroy({
            where: { productId },
        });
        await Review.destroy({
            where: { productId },
        });
        await ProductImage.destroy({
            where: { productId },
        });
        await ProductCart.destroy({
            where: { productId },
        });

        const product = await Product.findByPk(productId)

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
