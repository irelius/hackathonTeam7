'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Categories'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validCategories = [
      // All section
      {
        categoryName: "All",
        section: "All"
      },

      // Color section
      {
        categoryName: "White",
        section: "Color"
      },
      {
        categoryName: "Black",
        section: "Color"
      },
      {
        categoryName: "Clear",
        section: "Color"
      },

      // Availability section
      {
        categoryName: "Instock",
        section: "Availability"
      },
      {
        categoryName: "Outofstock",
        section: "Availability"
      },

      // Furniture section
      {
        categoryName: "Table",
        section: "Furniture"
      },
      {
        categoryName: "Desk",
        section: "Furniture"
      },
      {
        categoryName: "Dresser",
        section: "Furniture"
      },
      {
        categoryName: "Bookshelf",
        section: "Furniture"
      },
      {
        categoryName: "Chair",
        section: "Furniture"
      },
      {
        categoryName: "Stool",
        section: "Furniture"
      },
      {
        categoryName: "Sofa",
        section: "Furniture"
      },

      // Location section
      {
        categoryName: "Bedroom",
        section: "Location"
      },
      {
        categoryName: "Office",
        section: "Location"
      },
      {
        categoryName: "Kitchen",
        section: "Location"
      },
      {
        categoryName: "Dining",
        section: "Location"
      },
      {
        categoryName: "Living",
        section: "Location"
      },
      {
        categoryName: "Bathroom",
        section: "Location"
      },
      {
        categoryName: "Outdoor",
        section: "Location"
      },
      {
        categoryName: "Indoor",
        section: "Location"
      }
    ]

    await queryInterface.bulkInsert(options, validCategories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
