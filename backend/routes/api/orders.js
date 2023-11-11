const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Order } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete } = require('../../utils/errorFunc');
const { isAdmin, checkUser, forbidden } = require('../../utils/authorization');


// Get all orders made
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: orders })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all orders made by a user
router.get("/user/:userId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.params.userId
            }
        })

        if (!orders.length) {
            return notFoundError(res, "Orders")
        }

        res.json({ data: orders })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all orders made by current user
router.get("/current", restoreUser, requireAuth, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.user.id
            }
        })

        if (!orders.length) {
            return notFoundError(res, "Orders")
        }

        res.json({ data: orders })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// get order by id
router.get('/:orderId', restoreUser, requireAuth, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderId)
        if (!order) {
            return notFoundError(res, "Order")
        }

        if (order.userId !== req.user.id && res.user.id !== 1) {
            return notAuthToView(res, "order")
        }

        res.json({ data: order })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// get all orders made on a particular date
router.get("/date/:dateString", restoreUser, requireAuth, isAdmin, async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                orderDate: req.params.dateString
            }
        });
        if (!orders.length) {
            return notFoundError(res, "Orders");
        }

        // Handle the case where orders are found
        if (orders.userId === req.user.id || req.user.id === 1) {
            return res.json({ data: orders });
        }

        return res.status(403).json({ message: "You are not authorized to see this information." })
    } catch (err) {
        return internalServerError(res, err);
    }
});

router.post("/", restoreUser, requireAuth, async (req, res) => {
    let { cartId, productId, productName, productDescription, quantity, pricePerUnit } = req.body

    try {
        const newOrder = await Order.create({
            userId: req.user.id,
            cartId: cartId,
            productId: productId,
            productName: productName,
            productDescription: productDescription,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
        })

        res.status(201).json({ data: newOrder })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// delete a order
router.delete('/:orderId', restoreUser, requireAuth, async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId)

        if (!order) {
            return notFoundError(res, "Order")
        }

        if (order.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToDelete(res, "order")
        }

        await order.destroy()
        res.status(200).json({ message: "Order successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
