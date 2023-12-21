
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Order, Payment, Address, Review, ProductCart, Cart, StripeSession } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const router = express.Router();

// Restore session user
router.get('/', (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };
    return res.json({
      user: safeUser
    });
  } else return res.json({ user: null });
});

// get all employees
router.get("/employees", restoreUser, requireAuth, isAdmin, async (req, res) => {
  try {
    const employees = await User.findAll({
      where: {
        role: ["admin", "staff"]
      },
      attributes: { exclude: ["hashedPassword"] }
    })
    res.json({ data: employees })
  } catch (err) {
    return internalServerError(res, err)
  }
})

// Get employees, ordered
router.get("/employees/sort", restoreUser, requireAuth, isAdmin, async (req, res) => {
  try {
    let sortBy = req.query.sortBy || "username"
    let sortOrder = req.query.sortOrder || "ASC"

    const employees = await User.findAll({
      where: {
        role: ["admin", "staff"]
      },
      order: [
        [sortBy, sortOrder],
        ["username", "ASC"]
      ]
    })
    res.json({ data: employees })

  } catch (err) {
    return internalServerError(res, err)
  }
})


// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword, role });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});

// Create Employee Account
router.post('/employee', restoreUser, requireAuth, isAdmin, validateSignup, async (req, res) => {
  const { email, password, username, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword, role });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role
  };

  return res.json({
    user: safeUser
  });
})

// edit employee account
router.put("/:userId/info", restoreUser, requireAuth, isAdmin, async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const user = await User.findByPk(req.params.userId)

    if (!user) {
      return notFoundError(res, "User")
    }

    const hashedPassword = password ? bcrypt.hashSync(password) : user.hashedPassword;

    await User.update(
      { email, password: hashedPassword, username, role },
      {
        where: {
          id: req.params.userId,
        },
      }
    );

    const updatedUser = await User.findByPk(req.params.userId, {
      attributes: { exclude: ['hashedPassword'] },
    });
    res.status(201).json({ data: updatedUser })
  } catch (err) {
    return internalServerError(res, err)
  }
})


// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["hashedPassword"] }
    })
    res.json({ data: users })
  } catch (err) {
    return internalServerError(res, err)
  }
})


// delete an employee account
router.delete("/employee/:userId", restoreUser, requireAuth, isAdmin, async (req, res) => {
  const userId = req.params.userId
  try {
    await Payment.destroy({ where: { userId } })
    await Order.destroy({ where: { userId } })
    await Address.destroy({ where: { userId } })
    await Review.destroy({ where: { userId } })
    await ProductCart.destroy({ where: { userId } })
    // await Cart.destroy({ where: { userId } })
    await StripeSession.destroy({ where: { userId } })



    const employee = await User.findByPk(userId)
    if (!employee) {
      return notFoundError(res, "Employee to delete")
    }

    await employee.destroy();
    res.status(200).json({ data: employee });
  } catch (err) {
    console.error('Error deleting employee:', err);
    return internalServerError(res, err);
  }
})

module.exports = router;
