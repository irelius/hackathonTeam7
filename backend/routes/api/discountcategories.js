const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount, Category, DiscountCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { route } = require('./products');


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


// create a discountcategory
router.post("/", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const { discountId, categoryId } = req.body

        const newDiscountCategory = await DiscountCategory.create({
            discountId: discountId,
            categoryId: categoryId
        })

        res.status(201).json({ data: newDiscountCategory })
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
