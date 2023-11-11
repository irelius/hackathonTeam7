'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'StripeSessions'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validStripSessions = [
      {
        userId: 1,
        cartId: 1,
        sessionId: "test_stripe_session_id"
      },
    ]

    await queryInterface.bulkInsert(options, validStripSessions, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
