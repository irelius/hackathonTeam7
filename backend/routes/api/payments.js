const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Payment } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToEdit, notAuthToView, notAuthToDelete } = require('../../utils/errorFunc');
const { isAdmin, authPayment, checkUser } = require('../../utils/authorization');

// Get all payments
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const payments = await Payment.findAll()
        return res.json({ data: payments })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// get a payment by id
router.get("/:paymentId", restoreUser, requireAuth, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.paymentId)

        if (!payment) {
            return notFoundError(res, "Payment information")
        }

        if (payment.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToView(res, "payment")
        }

        return res.json({ data: payment })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// // get all payment a user has, needs to setup the payment table a bit more
// router.get('/user/:userId', restoreUser, requireAuth, checkUser, async (req, res) => {
//     try {
//         const payments = await Payment.findAll({
//             where: {
//                 userId: req.params.userId
//             },
//             attributes: { exclude: ["createdAt", "updatedAt"] }
//         })
//     } catch (err) {
//         return internalServerError(res, err)
//     }
// })

// create a new payment for a user


// edit a payment
router.put("/:paymentId", restoreUser, requireAuth, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.paymentId)

        if (!payment) {
            return notFoundError(res, "Payment")
        }

        if (req.user.id !== payment.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "payment information")
        }

        payment.method = req.body.method || payment.method
        payment.creditCardInformation = req.body.creditCardInformation || payment.creditCardInformation

        await payment.save()
        res.status(200).json({ data: payment })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// delete a payment
router.delete("/:paymentId", restoreUser, requireAuth, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.paymentId)

        if (!payment) {
            return notFoundError(res, "Payment information")
        }

        if (req.user.id !== payment.userId && req.user.id !== 1) {
            return notAuthToDelete(res, "payment information")
        }

        await payment.destroy()
        res.status(200).json({ message: "Payment information successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
