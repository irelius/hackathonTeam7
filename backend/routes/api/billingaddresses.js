const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { BillingAddress } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin, authBilling, checkUser, forbidden } = require('../../utils/authorization');


// Get all billing addresses
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const billingAddresses = await BillingAddress.findAll();
        res.json({ data: billingAddresses });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// get a billing address by id
router.get("/:billingAddressId", restoreUser, requireAuth, authBilling, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByPk(req.params.billingAddressId)
        if (!billingAddress) {
            return notFoundError(res, "Billing address")
        }
        res.json({ data: billingAddress })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get a billing address of a user
router.get("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (!billingAddress.length) {
            return notFoundError(res, "Billing address")
        }

        res.json({ data: billingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// User creates a billing address
router.post("/", restoreUser, requireAuth, async (req, res) => {
    const { billingFirstName, billingLastName, billingAddress, billingState, billingZipCode } = req.body;

    try {
        const newBillingAddress = await BillingAddress.create({
            userId: req.user.id,
            billingFirstName: billingFirstName,
            billingLastName: billingLastName,
            billingAddress: billingAddress,
            billingState: billingState,
            billingZipCode: billingZipCode
        });

        res.status(201).json({ data: newBillingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// User edits their billing address
router.put('/:billingAddressId', restoreUser, requireAuth, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByPk(req.params.billingAddressId)

        if (!billingAddress) {
            return notFoundError(res, "Billing Address")
        }

        if (req.user.id !== billingAddress.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "billing address")
        }

        billingAddress.billingFirstName = req.body.billingFirstName || billingAddress.billingFirstName
        billingAddress.billingLastName = req.body.billingLastName || billingAddress.billingLastName
        billingAddress.billingAddress = req.body.billingAddress || billingAddress.billingAddress;
        billingAddress.billingState = req.body.billingState || billingAddress.billingState;
        billingAddress.billingZipCode = req.body.billingZipCode || billingAddress.billingZipCode;

        await billingAddress.save();

        res.status(200).json({ data: billingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
})

// User delete their billing address
router.delete("/:billingAddressId", restoreUser, requireAuth, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByPk(req.params.billingAddressId)

        if (!billingAddress) {
            return notFoundError(res, "Billing Address")
        }

        if (req.user.id !== billingAddress.userId && req.user.id !== 1) {
            return notAuthToDelete(res, "billing address")
        }

        await billingAddress.destroy()
        res.status(200).json({ message: "Billing address successfully deleted", statusCode: 200 });
    } catch (err) {
        return internalServerError(res, err);
    }
});

module.exports = router
