const express = require('express');
const { environment } = require('../../config');
const { internalServerError, notFoundError, notAuthToDelete } = require('../../utils/errorFunc');
const { User, StripeSession, ProductCart } = require("../../db/models");
const { restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();

// get all product cart items for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const stripeSession = await StripeSession.findAll({
            where: {
                userId: req.user.id
            }
        })

        if (!stripeSession) {
            return notFoundError(res, "Stripe session")
        }

        res.json({ data: stripeSession });
    } catch (err) {
        return internalServerError(res, err)
    }
})

router.get("/:stripeSessionId", restoreUser, requireAuth, async (req, res) => {
    try {
        const stripeSession = await StripeSession.findAll({
            where: {
                userId: req.user.id,
                sessionId: req.params.stripeSessionId
            }
        })

        if (!stripeSession) {
            return notFoundError(res, "Stripe session")
        }

        res.json({ data: stripeSession });
    } catch (err) {
        return internalServerError(res, err)
    }
})

router.post("/", restoreUser, requireAuth, async (req, res) => {
    const { cartId, sessionId } = req.body
    try {
        const newStripeSession = await StripeSession.create({
            userId: req.user.id,
            cartId: cartId,
            sessionId: sessionId
        })

        res.status(201).json({ data: newStripeSession })
    } catch (err) {
        return internalServerError(res, err)
    }
})

router.delete("/:stripeSessionId", restoreUser, requireAuth, async (req, res) => {
    try {
        const stripeSession = await StripeSession.findOne({
            where: {
                sessionId: req.params.stripeSessionId
            }
        })

        if (!stripeSession) {
            return notFoundError(res, "Stripe session")
        }

        if (stripeSession.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToDelete(res, "stripe session")
        }

        await stripeSession.destroy()
        res.status(200).json({ data: stripeSession })
    } catch (err) {
        return internalServerError(res, err)
    }
})


module.exports = router
