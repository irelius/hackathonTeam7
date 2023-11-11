'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Discounts'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validDiscounts = [
      {
        codeName: "WELCOME15",
        applicableCategory: "All",
        discountType: "Percent",
        discountValue: 15,
        expirationDate: new Date("9999-12-31")
      },
      {
        codeName: "CHAIR10",
        applicableCategory: "Chair",
        discountType: "Percent",
        discountValue: 10,
        expirationDate: new Date("2023-12-31")
      },
      {
        codeName: "SUMMER30",
        applicableCategory: "Furniture",
        discountType: "Percent",
        discountValue: 30,
        expirationDate: new Date("2024-8-31")
      }
      // another discount type could be a flat discount, like $100 dollars
    ]

    await queryInterface.bulkInsert(options, validDiscounts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
