'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'DiscountCategories'

module.exports = {
  async up (queryInterface, Sequelize) {
    // const validDiscountCategories = [
    //   {
    //     discountId: 1,
    //     categoryId: 1,
    //   },
    //   {
    //     discountId: 2,
    //     categoryId: 11,
    //   },
    //   {
    //     discountId: 3,
    //     categoryId: 8,
    //   },
    // ]

    // await queryInterface.bulkInsert(options, validDiscountCategories, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
