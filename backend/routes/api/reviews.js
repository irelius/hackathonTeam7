const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Review, Product } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { checkUser } = require('../../utils/authorization');


// Get all reviews
router.get("/all", restoreUser, requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll()
        res.json({ data: reviews })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Get all reviews
router.get("/all/by-newest", restoreUser, requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            order: [["createdAt", "DESC"]]
        })
        res.json({ data: reviews })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Get a review by id
router.get("/:reviewId", restoreUser, requireAuth, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId)
        if (!review) {
            return notFoundError(res, "Review")
        }
        res.json({ data: review })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Get all reviews made to a particular product
router.get("/product/:productId", restoreUser, requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: req.params.productId
            }
        })

        res.json({ data: reviews })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get a user's review for a product
router.get("/product/:productId/user/:userId", restoreUser, requireAuth, async (req, res) => {
    try {
        const review = await Review.findAll({
            where: {
                userId: req.params.userId,
                productId: req.params.productId
            }
        })

        if (!review.length) {
            return notFoundError(res, "Review")
        }

        res.json({ data: review })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// Get all reviews made by a user
router.get('/user/:userId', restoreUser, requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                userId: req.params.userId
            }
        })

        res.json({ data: reviews })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// create new review for a product
router.post('/', restoreUser, requireAuth, async (req, res) => {
    try {
        const { productId, review, rating } = req.body;

        // check if product exists
        const product = await Product.findByPk(productId)
        if (!product) {
            return notFoundError(res, "Product")
        }

        // check if user already has a review for a product
        const checkForReview = await Review.findAll({
            where: {
                productId: productId,
                userId: req.user.id
            }
        })
        if (checkForReview.length > 0) {
            res.status(403).json({ message: "User already has a review for this product." })
        }

        // if there's no problem, create a new review for a product
        const newReview = await Review.create({
            userId: req.user.id,
            productId: productId,
            review: review,
            rating: rating
        })

        res.json({ data: newReview })
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// update a product's review
router.put("/:reviewId", restoreUser, requireAuth, async (req, res) => {
    const { reviewInfo } = req.body;
    try {
        const reviewToEdit = await Review.findByPk(req.params.reviewId)

        if (!reviewToEdit) {
            return notFoundError(res, "Review")
        }

        if (reviewToEdit.userId !== req.user.id) {
            return notAuthToEdit(res, "review")
        }

        reviewToEdit.review = reviewInfo.review
        reviewToEdit.rating = reviewInfo.rating

        await reviewToEdit.save()
        return res.json({ data: reviewToEdit })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// delete a review for a product
router.delete("/:reviewId", restoreUser, requireAuth, async (req, res) => {
    try {
        const reviewToDelete = await Review.findByPk(req.params.reviewId)
        if (!reviewToDelete) {
            return notFoundError(res, "Review")
        }

        if (req.user.id !== reviewToDelete.userId) {
            return notAuthToDelete(res, "review")
        }

        await reviewToDelete.destroy()
        res.status(200).json({ data: reviewToDelete })
    } catch (err) {
        return internalServerError(res, err)
    }
})


module.exports = router
