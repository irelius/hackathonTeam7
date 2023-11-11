const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ProductImage } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');

// Get all productImage
router.get("/all", async (req, res) => {
    try {
        const productImage = await ProductImage.findAll()
        res.json({ data: productImage })
    } catch (err) {
        return internalServerError(res, err)
    }
})


module.exports = router
