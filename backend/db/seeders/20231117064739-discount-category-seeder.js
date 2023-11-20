'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'DiscountCategories'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validDiscountCategories = [
      {
        discountId: 1,
        categoryId: 1,
      },
      {
        discountId: 1,
        categoryId: 2,
      },
      {
        discountId: 1,
        categoryId: 3,
      },
      {
        discountId: 2,
        categoryId: 11,
      },
      {
        discountId: 2,
        categoryId: 12,
      },
      {
        discountId: 3,
        categoryId: 7,
      },
      {
        discountId: 3,
        categoryId: 8,
      },
      {
        discountId: 3,
        categoryId: 9,
      },
      {
        discountId: 3,
        categoryId: 10,
      },
    ]

    await queryInterface.bulkInsert(options, validDiscountCategories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
