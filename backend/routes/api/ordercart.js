const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { OrderCart, Order, Product, User } = require("../../db/models");

// Get all OrderCarts
router.get('/all', restoreUser, requireAuth, async (req, res, next) => {
    try {
        const OrderCarts = await OrderCart.findAll();
        res.json({ data: OrderCarts })
    } catch (err) {
        return internalServerError(res, err)
    }
});

// Get OrderCarts by the current user
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    try {
        const OrderCarts = await OrderCart.findAll({
            include: [
                {
                    model: Order,
                    where: {
                        userId: req.user.id,
                    },
                    include: [Product, User],
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        res.json({ data: OrderCarts });
    } catch (err) {
        return internalServerError(res, err)
    }
});


// Get one OrderCart by ID
router.get('/:productCartId', restoreUser, requireAuth, isAdmin, async (req, res, next) => {
    try {
        const OrderCart = await OrderCart.findByPk(req.params.productCartId);

        if (!OrderCart) {
            return notFoundError(res, "Cart")
        }
        res.json({ data: OrderCartId });
    } catch (err) {
        return internalServerError(res, err)
    }
});


module.exports = router;
