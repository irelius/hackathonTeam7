'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Addresses'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validAddresses = [
      {
        userId: 2,
        type: "billing",
        firstName: "Demo",
        lastName: "User",
        address: "123 Main Street",
        state: "California",
        zipCode: "90210"
      },
      {
        userId: 2,
        type: "billing",
        firstName: "Demo",
        lastName: "User",
        address: "456 Side Street",
        state: "New York",
        zipCode: "10101"
      },
      {
        userId: 3,
        type: "billing",
        firstName: "User",
        lastName: "Two",
        address: "456 Elm Avenue",
        state: "New York",
        zipCode: "10001"
      },
      {
        userId: 4,
        type: "billing",
        firstName: "User",
        lastName: "Three",
        address: "789 Oak Lane",
        state: "Texas",
        zipCode: "77002"
      },
      {
        userId: 2,
        type: "shipping",
        firstName: "Demo",
        lastName: "User",
        address: "123 Main Street",
        state: "California",
        zipCode: "90210"
      },
      {
        userId: 2,
        type: "shipping",
        firstName: "Demo",
        lastName: "User",
        address: "456 Side Street",
        state: "New York",
        zipCode: "10101"
      },
      {
        userId: 3,
        type: "shipping",
        firstName: "User",
        lastName: "Two",
        address: "456 Elm Avenue",
        state: "New York",
        zipCode: "10001"
      },
      {
        userId: 4,
        type: "shipping",
        firstName: "User",
        lastName: "Three",
        address: "789 Oak Lane",
        state: "Texas",
        zipCode: "77002"
      },
    ]

    await queryInterface.bulkInsert(options, validAddresses, {})


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
