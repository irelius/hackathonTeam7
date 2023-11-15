'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Payments'

module.exports = {
  async up(queryInterface, Sequelize) {
    // this is just a sample payment seeder, don't know how the table is actually going to look in the end
    // will require future edits
    const validPayments = [
      {
        userId: "2",
        defaultPayment: true,
        cardHolder: "Demo User",
        cardNumber: "4242424242424242",
        expirationDate: "04/24",
      },
      {
        userId: "2",
        defaultPayment: false,
        cardHolder: "Demo User",
        cardNumber: "1111111111111111",
        expirationDate: "04/24",
      },
      {
        userId: "3",
        defaultPayment: true,
        cardHolder: "User One",
        cardNumber: "4242424242424242",
        expirationDate: "04/24",
      },
      {
        userId: "4",
        defaultPayment: true,
        cardHolder: "User Two",
        cardNumber: "4242424242424242",
        expirationDate: "04/24",
      }
    ]

    await queryInterface.bulkInsert(options, validPayments, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
