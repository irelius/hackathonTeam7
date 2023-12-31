const { Address, Discount, Order, Payment, ProductCategory, Product, Review, ShippingAddress, User } = require("../db/models")
const { nextError } = require("./errorFunc")

const forbidden = () => {
    let error = new Error("Forbidden");
    error.status = 403;
    error.statusCode = 403;
    return error
}

const isAdmin = function (req, res, next) {
    const user = req.user

    if (user.role === "admin") {
        return next()
    }
    return nextError(next, "Admin privileges required.", 403)
}

const isEmployee = function (req, res, next) {
    const user = req.user
    if(user.role === "admin" || user.role === "staff") {
        return next()
    }

    return nextError(next, "Employee privileges required.", 403)
}

const checkUser = function (req, res, next) {
    if (req.params.userId === req.user.id || req.user.id === 1) {
        return next()
    }
    return next(forbidden())
}

const authAddress = async function (req, res, next) {
    const address = await Address.findByPk(req.params.addressId)
    if (req.user.id !== address.userId || address.userId === 1) {
        return next()
    }
    return next(forbidden())
}


const authPayment = async function (req, res, next) {
    const payment = await Payment.findByPk(req.params.paymentId)
    if (req.user.id === payment.userId || payment.userId === 1) {
        return next()
    }

    return next(forbidden())
}



module.exports = {
    forbidden,
    isAdmin,
    isEmployee,
    checkUser,
    authAddress,
    authPayment,
}
