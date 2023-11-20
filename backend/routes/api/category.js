const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Category } = require("../../db/models");
const { isAdmin } = require('../../utils/authorization');
const { notFoundError, notAuthToEdit, notAuthToDelete, internalServerError } = require('../../utils/errorFunc');

router.get("/all", restoreUser, requireAuth, async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: categories })
    } catch (err) {
        return internalServerError(res, err)
    }
})


module.exports = router
