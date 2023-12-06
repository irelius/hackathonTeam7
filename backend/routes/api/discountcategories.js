const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount, Category, DiscountCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { route } = require('./discounts');


// get all discount categories
router.get('/all', restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const discountCategories = await DiscountCategory.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Discount,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                }
            ]
        })
        res.json({ data: discountCategories })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get a discountCategory based on discountCategory id
router.get('/:discountCategoryId', async (req, res) => {
    try {
        const discountCategory = await DiscountCategory.findByPk(req.params.discountCategoryId, {
            include: [
                {
                    model: Discount,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })

        if (!discountCategory) {
            return notFoundError(res, "Discount Category")
        }

        res.json({ data: discountCategory })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all discountCategories based on discountId
router.get('/discount/:discountId', async (req, res) => {
    try {
        const discountCategory = await DiscountCategory.findAll({
            where: {
                discountId: req.params.discountId
            },
            include: [
                {
                    model: Discount,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })

        res.json({ data: discountCategory })

    } catch (err) {
        return internalServerError(res, err)
    }
})


// get all discountCategories based on categoryId
router.get('/category/:categoryId', async (req, res) => {
    try {
        const discountCategory = await DiscountCategory.findAll({
            where: {
                categoryId: req.params.categoryId
            },
            include: [
                {
                    model: Discount,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })

        res.json({ data: discountCategory })

    } catch (err) {
        return internalServerError(res, err)
    }
})


// create a new discountCategory
// will create a new discount category between a discount Id and for each category passed in
router.post("/", restoreUser, requireAuth, isAdmin, async (req, res) => {
    let { discountId, categoryArr } = req.body // categoryArr is an array structured like: ["Black", "Indoor"]

    let newPCs = []

    try {
        for (let i = 0; i < categoryArr.length; i++) { // cycle through each category and create a new pairing
            let curr = categoryArr[i]

            const categoryId = await Category.findOne({
                where: {
                    categoryName: curr
                },
                attributes: ["id"]
            })

            if (categoryId) {
                const newDiscountCategory = await DiscountCategory.create({
                    discountId: discountId,
                    categoryId: categoryId.id
                })

                newPCs.push(newDiscountCategory)
            }
        }

        if (newPCs.length > 0) {
            res.status(201).json({ data: newPCs });
        }
    } catch (err) {
        return internalServerError(res, err)
    }
})

// edit the discount categories of a discount
router.put('/:discountId', restoreUser, requireAuth, isAdmin, async (req, res) => {
    const { categoryArr } = req.body

    const discountId = req.params.discountId

    try {
        DiscountCategory.destroy({
            where: {
                discountId: discountId,
            },
        });

        for (let i = 0; i < categoryArr.length; i++) {
            let curr = categoryArr[i]

            const categoryId = await Category.findOne({
                where: {
                    categoryName: curr
                }
            })

            if (categoryId) {
                await DiscountCategory.create({
                    discountId: discountId,
                    categoryId: categoryId.id
                })
            }
        }

        const returnDCs = await DiscountCategory.findAll({
            where: {
                discountId: discountId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.status(201).json({ data: returnDCs })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// delete a discountcategory
router.delete("/:discountCategoryId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const discountCategoryToDelete = await DiscountCategory.findByPk(req.params.discountCategoryId)
        if (!discountCategoryToDelete) {
            return notFoundError(res, "Discount Category")
        }

        await discountCategoryToDelete.destroy()
        res.status(200).json({ message: "Discount Category successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
