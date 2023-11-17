const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');


// Get all discounts
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const discounts = await Discount.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: discounts })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get a discount by id
router.get("/:discountId", restoreUser, requireAuth, async (req, res, next) => {
    try {
        const discount = await Discount.findByPk(req.params.discountId)
        if (!discount) {
            return notFoundError(res, "Discount")
        }

        res.json({ data: discount })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Create a new discount
router.post("/", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const { discountName, applicableCategory, discountType, discountValue, expirationDate } = req.body

        const newDiscount = await Discount.create({
            applicableCategory: applicableCategory,
            discountName: discountName,
            discountType: discountType,
            discountValue: discountValue,
            expirationDate: expirationDate
        })

        res.status(201).json({ data: newDiscount })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// edit a discount
router.put('/:discountId', restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const discountToEdit = await Discount.findByPk(req.params.discountId)
        if (!discountToEdit) {
            return notFoundError(res, "Discount")
        }

        discountToEdit.applicableCategory = req.body.applicableCategory || discountToEdit.applicableCategory
        discountToEdit.discountName = req.body.discountName || discountToEdit.discountName
        discountToEdit.discountType = req.body.discountType || discountToEdit.discountType
        discountToEdit.discountValue = req.body.discountValue || discountToEdit.discountValue
        discountToEdit.expirationDate = req.body.expirationDate || discountToEdit.expirationDate

        await discountToEdit.save()

        res.status(200).json({ date: discountToEdit })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Delete a discount
router.delete('/:discountId', restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.discountId)
        if (!discount) {
            return notFoundError(res, "Discount")
        }

        await discount.destroy()
        res.status(200).json({ message: "Discount successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
