'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'ProductCarts'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validProductCarts = [
      // for User 2
      {
        userId: 2,
        cartId: 2,
        productId: 1,
        productQuantity: 2,
        pricePerUnit: 7999
      },
      {
        userId: 2,
        cartId: 2,
        productId: 2,
        productQuantity: 1,
        pricePerUnit: 8999
      },
      // for User 3
      {
        userId: 3,
        cartId: 3,
        productId: 1,
        productQuantity: 1,
        pricePerUnit: 7999
      },
      {
        userId: 3,
        cartId: 3,
        productId: 3,
        productQuantity: 1,
        pricePerUnit: 7499
      },
      {
        userId: 3,
        cartId: 3,
        productId: 4,
        productQuantity: 1,
        pricePerUnit: 8499,
      },
      {
        userId: 3,
        cartId: 3,
        productId: 9,
        productQuantity: 1,
        pricePerUnit:  12999,
      },
      // For User 4
      {
        userId: 4,
        cartId: 4,
        productId: 7,
        productQuantity: 1,
        pricePerUnit: 14999
      },
      // For User 5
      {
        userId: 4,
        cartId: 5,
        productId: 3,
        productQuantity: 4,
        pricePerUnit: 7499
      },
      {
        userId: 5,
        cartId: 5,
        productId: 4,
        productQuantity: 2,
        pricePerUnit: 8499
      },
      {
        userId: 5,
        cartId: 5,
        productId: 8,
        productQuantity: 4,
        pricePerUnit: 13999
      },
    ]

    await queryInterface.bulkInsert(options, validProductCarts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
