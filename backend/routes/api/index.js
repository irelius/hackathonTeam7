
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const discountRouter = require("./discounts.js")
const productRouter = require('./products.js')
const productCategoryRouter = require('./productcategories.js')
const productImageRouter = require('./productimages.js')
const reviewRouter = require("./reviews.js")
const addressRouter = require('./addresses.js')
const cartRouter = require('./carts.js')
const orderRouter = require("./orders.js")
const paymentRouter = require('./payments.js')
const productCartRouter = require("./productcart.js")
const stripeRouter = require('./stripe.js')
const stripeSessionRouter = require('./stripesession.js')

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/discount', discountRouter);
router.use('/product', productRouter);
router.use('/productcategory', productCategoryRouter);
router.use('/productcart', productCartRouter)
router.use('/productimage', productImageRouter);
router.use('/review', reviewRouter);
router.use('/address', addressRouter)
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use("/stripesession", stripeSessionRouter)
router.use("/stripe", stripeRouter)


router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});

module.exports = router;
