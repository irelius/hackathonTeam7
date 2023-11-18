'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Orders'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validOrders = [
      {
        userId: 2,
        cartId: 2,
        productId: 1,
        productName: "Simple Side Table",
        productDescription: "A versatile addition to your living space, this Simple Side Table provides a clean and understated design. Its neutral appearance allows it to effortlessly complement any decor style. Crafted with quality materials, this table offers both form and function.",
        productQuantity: 2,
        pricePerUnit: 7999,
        status: "complete",
        totalAmount: 15998
      },
      {
        userId: 2,
        cartId: 2,
        productId: 8,
        productName: "Minimalist Center Table",
        productDescription: "The Minimalist Center Table offers a clean and versatile focal point for your living space. Its understated design complements a wide range of decor styles. Crafted with quality materials, this table balances both form and function.",
        productQuantity: 1,
        pricePerUnit: 13999,
        status: "complete",
        totalAmount: 13999
      },
      {
        userId: 2,
        cartId: 2,
        productId: 2,
        productName: "Minimalist Accent Table",
        productDescription: "Enhance your living space with the Minimalist Accent Table. Its sleek and timeless design makes it an ideal addition to any room. Crafted for durability and style, this table effortlessly balances form and function.",
        productQuantity: 1,
        pricePerUnit: 8999,
        status: "complete",
        totalAmount: 8999,
      },
      {
        userId: 3,
        cartId: 3,
        productId: 3,
        productName: "Functional End Table",
        productDescription: "The Functional End Table is designed to meet your everyday needs. Its unassuming design ensures it fits seamlessly into any space. Crafted with quality materials, this table offers both utility and style.",
        productQuantity: 2,
        pricePerUnit: 7499,
        status: "complete",
        totalAmount: 14998,
      },
      {
        userId: 3,
        cartId: 3,
        productId: 4,
        productName: "Neutral Side Table",
        productDescription: "The Neutral Side Table is the epitome of adaptability. Its timeless design effortlessly complements various decor styles. Crafted for both durability and aesthetic appeal, this table enhances your space.",
        productQuantity: 4,
        pricePerUnit: 8499,
        status: "complete",
        totalAmount: 33996,
      },
      {
        userId: 4,
        cartId: 4,
        productId: 5,
        productName: "Contemporary Accent Table",
        productDescription: "Upgrade your decor with the Contemporary Accent Table. Its modern yet versatile design ensures it can enhance any room. Crafted with precision and style in mind, this table offers both form and function.",
        productQuantity: 1,
        pricePerUnit: 9999,
        status: "processing",
        totalAmount: 9999,
      },
    ]

    await queryInterface.bulkInsert(options, validOrders, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
