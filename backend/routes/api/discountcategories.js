const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount, Category, DiscountCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { route } = require('./products');


// get all discount categories
router.get('/all', async(req, res) => {
    try {
        const discountCategories = await DiscountCategory.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: discountCategories })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
