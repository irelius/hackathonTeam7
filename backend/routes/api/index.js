
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const addressRouter = require('./addresses.js')
const paymentRouter = require('./payments.js')
const cartRouter = require('./carts.js')
const orderRouter = require("./orders.js")

const productRouter = require('./products.js')
const productImageRouter = require('./productimages.js')
const productCategoryRouter = require('./productcategories.js')
const reviewRouter = require("./reviews.js")
const productCartRouter = require("./productcart.js")

const discountRouter = require("./discounts.js")
const discountCategoryRouter = require('./discountcategories.js')

const stripeRouter = require('./stripe.js')
const stripeSessionRouter = require('./stripesession.js')


router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/address', addressRouter)
router.use('/payment', paymentRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/productimage', productImageRouter);
router.use('/productcategory', productCategoryRouter);
router.use('/review', reviewRouter);
router.use('/productcart', productCartRouter)
router.use('/discount', discountRouter);
router.use('/discountcategory', discountCategoryRouter)
router.use("/stripesession", stripeSessionRouter)
router.use("/stripe", stripeRouter)


router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});

module.exports = router;
