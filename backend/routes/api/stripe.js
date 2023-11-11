const express = require('express');
const { environment } = require('../../config');
const { internalServerError } = require('../../utils/errorFunc');
const { User, Cart, Product, ProductCart } = require("../../db/models");
const { restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();

let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// route for processing stripe payment
router.post("/", restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        let url = environment === "development" ? "http://localhost:3000" : "hackathonteam7.onrender.com"

        let cartItems = []

        for (let i = 0; i < productCart.length; i++) {
            let curr = productCart[i]
            let product = await Product.findByPk(curr.productId)

            cartItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.productName
                    },
                    unit_amount: curr.pricePerUnit,
                },
                quantity: curr.quantity,
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems,
            mode: 'payment',
            success_url: `${url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`
        })

        return res.json({ data: session })

    } catch (err) {
        return internalServerError(res, err)
    }
})


// // To get Stripe to work correctly, webhooks are necessary.
// router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
//     const sigHeader = req.headers['stripe-signature'];
//     try {
//         const event = stripe.webhooks.constructEvent(req.body, sigHeader, process.env.STRIPE_PUBLIC_KEY);

//         // Process the webhook event based on its type
//         switch (event.type) {
//             case 'checkout.session.completed':
//                 // Handle the checkout success event (e.g., delete the user's cart)
//                 // You can refer to the previous responses for handling this event.
//                 break;

//             // Add more cases to handle other webhook event types if needed.

//             default:
//                 console.log(`Unhandled webhook event type: ${event.type}`);
//         }

//         res.status(200).end();
//     } catch (error) {
//         console.error('Webhook signature verification failed:', error);
//         res.status(400).send('Webhook Error: Invalid signature');
//     }
// });


module.exports = router
