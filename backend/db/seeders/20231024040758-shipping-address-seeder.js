'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'ShippingAddresses'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validShippingAddresses = [
      {
        userId: 2,
        shippingFirstName: "Demo",
        shippingLastName: "User",
        shippingAddress: "567 Palm Boulevard",
        shippingState: "California",
        shippingZipCode: "94102"
      },
      {
        userId: 3,
        shippingFirstName: "User",
        shippingLastName: "Two",
        shippingAddress: "456 Elm Avenue",
        shippingState: "New York",
        shippingZipCode: "10001"
      },
      {
        userId: 4,
        shippingFirstName: "User",
        shippingLastName: "Three",
        shippingAddress: "789 Oak Lane",
        shippingState: "Texas",
        shippingZipCode: "77002"
      },
    ]

    await queryInterface.bulkInsert(options, validShippingAddresses, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
