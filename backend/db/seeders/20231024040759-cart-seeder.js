'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Carts'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validCarts = [
      // 1
      {
        userId: 1,
      },
      // 2
      {
        userId: 2,
      },
      // 3
      {
        userId: 3,
      },
      // 4
      {
        userId: 4,
      },
      // 5
      {
        userId: 5,
      },

    ]

    await queryInterface.bulkInsert(options, validCarts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
