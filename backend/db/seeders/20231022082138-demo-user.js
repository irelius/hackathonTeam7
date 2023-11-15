
'use strict';

const { query } = require('express');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Users'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validUsers = [
      {
        email: 'admin@aa.io',
        username: 'AdminUser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo@aa.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@aa.io',
        username: 'UserOne',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@aa.io',
        username: 'UserTwo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@aa.io',
        username: 'UserThree',
        hashedPassword: bcrypt.hashSync('password')
      },
    ]

    await queryInterface.bulkInsert(options, validUsers, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
