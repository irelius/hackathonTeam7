const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Cart } = require("../../db/models");
const { isAdmin } = require('../../utils/authorization');
const { notFoundError, notAuthToEdit, notAuthToDelete, internalServerError } = require('../../utils/errorFunc');


// get all the carts
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const carts = await Cart.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: carts })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get the cart for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        res.json({ data: cart })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get cart by cart Id
router.get("/:cartId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.cartId)
        res.json(cart)
    } catch (err) {
        return internalServerError(res, err)
    }
})


//create a new cart
router.post('/', restoreUser, requireAuth, async (req, res) => {
    try {
        const newCart = await Cart.create({
            userId: req.user.id,
        });

        res.json({ data: newCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})



// clear current user's cart for when an order is placed, then create a new cart for user
// this route also functions as the POST for new Order
router.delete("/:cartId", restoreUser, requireAuth, async (req, res) => {
    try {
        const userCart = await Cart.findByPk(req.params.cartId)

        if (!userCart) {
            return notFoundError(res, "Cart")
        }

        if (userCart.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToDelete(res, "cart")
        }

        await userCart.destroy()
        res.status(200).json({ message: "Cart successfully deleted", statusCode: 200 });
    } catch (err) {
        return internalServerError(res, err)
    }
})



module.exports = router
