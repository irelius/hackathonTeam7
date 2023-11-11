const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Product, Cart, ProductCart } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');

// Get all productCarts
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: productCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all product cart items for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        return res.json({ data: productCart })

    } catch (err) {
        return internalServerError(res, err)
    }
})


// get all items of a cart
router.get('/:cartId', restoreUser, requireAuth, async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.cartId)

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        if (cart.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToView(res, "cart")
        }

        const productCart = await ProductCart.findAll({
            where: {
                cartId: req.params.cartId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        res.json({ data: productCart })

    } catch (err) {
        return internalServerError(res, err)
    }
})

// create a new product cart item
router.post("/", restoreUser, requireAuth, async (req, res) => {
    let { productId, quantity } = req.body


    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        })

        const product = await Product.findByPk(productId)

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        const newProductCart = await ProductCart.create({
            userId: req.user.id,
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            pricePerUnit: product.productPrice
        })

        res.status(201).json({ data: newProductCart });
    } catch (err) {
        return internalServerError(res, err);
    }
})


// edit a product cart quantity. Only if the user owns that product cart row or the user is the Admin
router.put('/:productCartId', restoreUser, requireAuth, async (req, res) => {

    try {
        const productCartId = req.params.productCartId
        const { quantity } = req.body

        // Find the ProductCart by its id
        const productCart = await ProductCart.findByPk(productCartId);

        if (!productCart) {
            return notFoundError(res, "Product Cart")
        }

        if (req.user.id !== productCart.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "product cart")
        }

        productCart.quantity += quantity;
        await productCart.save();

        res.status(201).json({ data: productCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// delete a productCart
router.delete("/:productCartId", restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findByPk(req.params.productCartId)

        if (!productCart) {
            return notFoundError(res, "Product Cart")
        }

        if (productCart.cartId !== req.user.id && req.user.id !== 1) {
            return notAuthToDelete(res, "product cart")
        }

        await productCart.destroy()
        res.status(200).json({ data: productCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
