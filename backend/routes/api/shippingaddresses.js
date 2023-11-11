const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ShippingAddress } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete } = require('../../utils/errorFunc');
const { isAdmin, checkUser, authShipping } = require('../../utils/authorization');


// Get all shipping addresses
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const shippingAddresses = await ShippingAddress.findAll();
        res.json({ data: shippingAddresses });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// // get a shipping address by id
// router.get("/:shippingAddressId", restoreUser, requireAuth, async (req, res) => {
//     try {
//         const shippingAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)
//         if (!shippingAddress) {
//             return notFoundError(res, "Shipping address")
//         }

//         if (req.user.id !== shippingAddress.userId && req.user.id !== 1) {
//             return notAuthToView(res, "shipping address")
//         }
//         res.json({ data: shippingAddress })
//     } catch (err) {
//         return internalServerError(res, err)
//     }
// })


// get shipping addresses of current user
router.get("/current", restoreUser, requireAuth, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findAll({
            where: {
                userId: req.user.id
            }
        })

        if (!shippingAddress.length) {
            return notFoundError(res, "Shipping address")
        }

        res.json({ data: shippingAddress })
    } catch (err) {
        return internalServerError(res, err);
    }
})


// Get a shipping address of specific user
router.get("/user/:userId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (!shippingAddress.length) {
            return notFoundError(res, "Shipping address")
        }

        res.json({ data: shippingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// Create a shipping address for a user
router.post("/", restoreUser, requireAuth, async (req, res) => {
    const { shippingFirstName, shippingLastName, shippingAddress, shippingState, shippingZipCode } = req.body;

    try {
        const newShippingAddress = await ShippingAddress.create({
            userId: req.user.id,
            shippingFirstName: shippingFirstName,
            shippingLastName: shippingLastName,
            shippingAddress: shippingAddress,
            shippingState: shippingState,
            shippingZipCode: shippingZipCode
        });

        res.status(201).json({ data: newShippingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// User edits their shipping address
router.put('/:shippingAddressId', restoreUser, requireAuth, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)

        if (!shippingAddress) {
            return notFoundError(res, "Shipping Address")
        }

        if (req.user.id !== shippingAddress.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "shipping address")
        }

        shippingAddress.shippingFirstName = req.body.shippingFirstName || shippingAddress.shippingFirstName;
        shippingAddress.shippingLastName = req.body.shippingLastName || shippingAddress.shippingLastName;
        shippingAddress.shippingAddress = req.body.shippingAddress || shippingAddress.shippingAddress;
        shippingAddress.shippingState = req.body.shippingState || shippingAddress.shippingState;
        shippingAddress.shippingZipCode = req.body.shippingZipCode || shippingAddress.shippingZipCode;

        await shippingAddress.save();

        res.status(200).json({ data: shippingAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
})


// Delete a shipping address for a user
router.delete("/:shippingAddressId", restoreUser, requireAuth, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)
        if (!shippingAddress) {
            return notFoundError(res, "Shipping Address")
        }

        if (req.user.id !== shippingAddress.userId && req.user.id !== 1) {
            return notAuthToDelete(res, "shipping address")
        }

        await shippingAddress.destroy()
        res.status(200).json({ message: "Shipping address successfully deleted", statusCode: 200 });
    } catch (err) {
        return internalServerError(res, err);
    }
});


module.exports = router
