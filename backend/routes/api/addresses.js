const express = require('express')
const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Address } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin, checkUser, forbidden, authAddress } = require('../../utils/authorization');


// Get all addresses
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const addresses = await Address.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
        res.json({ data: addresses });
    } catch (err) {
        return internalServerError(res, err);
    }
});

// get an address by id
router.get("/:addressId", restoreUser, requireAuth, authAddress, async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.addressId)
        if (!address) {
            return notFoundError(res, "Address")
        }
        res.json({ data: address })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get all billing addresses
router.get("/billing/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const addresses = await Address.findAll({
            where: {
                type: "billing"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
        res.json({ data: addresses });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// Get all shipping addresses
router.get("/shipping/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const addresses = await Address.findAll({
            where: {
                type: "shipping"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
        res.json({ data: addresses });
    } catch (err) {
        return internalServerError(res, err);
    }
});

// Get a billing address of current user
router.get("/billing/user/current", restoreUser, requireAuth, async (req, res) => {
    try {
        const address = await Address.findAll({
            where: {
                userId: req.user.id,
                type: "billing"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!address.length) {
            return notFoundError(res, "Billing address")
        }

        res.json({ data: address });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// Get a shipping address of current user
router.get("/shipping/user/current", restoreUser, requireAuth, async (req, res) => {
    try {
        const address = await Address.findAll({
            where: {
                userId: req.user.id,
                type: "shipping"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!address.length) {
            return notFoundError(res, "Shipping address")
        }

        res.json({ data: address });
    } catch (err) {
        return internalServerError(res, err);
    }
});

// Get a billing address of a user
router.get("/billing/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const address = await Address.findAll({
            where: {
                userId: req.params.userId,
                type: "billing"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!address.length) {
            return notFoundError(res, "Billing address")
        }

        res.json({ data: address });
    } catch (err) {
        return internalServerError(res, err);
    }
});

// Get a shipping address of a user
router.get("/shipping/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const address = await Address.findAll({
            where: {
                userId: req.params.userId,
                type: "shipping"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!address.length) {
            return notFoundError(res, "Shipping address")
        }

        res.json({ data: address });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// User creates a billing address
router.post("/", restoreUser, requireAuth, async (req, res) => {
    const { type, firstName, lastName, address, state, zipCode } = req.body;

    try {
        const newAddress = await Address.create({
            userId: req.user.id,
            type: type,
            firstName: firstName,
            lastName: lastName,
            address: address,
            state: state,
            zipCode: zipCode
        });

        res.status(201).json({ data: newAddress });
    } catch (err) {
        return internalServerError(res, err);
    }
});


// User edits their address. Can't change the type of an address though
router.put('/:addressId', restoreUser, requireAuth, async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.addressId)

        if (!address) {
            return notFoundError(res, "Address")
        }

        if (req.user.id !== address.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "address")
        }

        address.firstName = req.body.firstName || address.firstName
        address.lastName = req.body.lastName || address.lastName
        address.address = req.body.address || address.address;
        address.state = req.body.state || address.state;
        address.zipCode = req.body.zipCode || address.zipCode;

        await address.save();

        res.status(200).json({ data: address });
    } catch (err) {
        return internalServerError(res, err);
    }
})

// User deletes an address
router.delete("/:addressId", restoreUser, requireAuth, async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.addressId)
        if (!address) {
            return notFoundError(res, "Address")
        }
        if (req.user.id !== address.userId && req.user.id !== 1) {
            return notAuthToDelete(res, "address")
        }

        await address.destroy()
        res.status(200).json({ message: "Address successfully deleted", statusCode: 200 });
    } catch (err) {
        return internalServerError(res, err);
    }
});

module.exports = router
