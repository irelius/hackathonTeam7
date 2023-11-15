"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Discounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicableCategory: {
        type: Sequelize.STRING,
        defaultValue: "All",
      },
      discountName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discountType: {
        type: Sequelize.STRING,
        defaultValue: "percent",
      },
      discountValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATEONLY,
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
    options.tableName = "Discounts";
    return queryInterface.dropTable(options);
  }
};
