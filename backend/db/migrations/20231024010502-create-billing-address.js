"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("BillingAddresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: "id"
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      billingFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      billingLastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      billingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      billingState: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      billingZipCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "BillingAddresses";
    return queryInterface.dropTable(options);
  }
};
