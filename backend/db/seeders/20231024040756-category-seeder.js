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
      // 1
      {
        categoryName: "All",
        section: "All"
      },

      // Color section
      // 2
      {
        categoryName: "White",
        section: "Color"
      },
      // 3
      {
        categoryName: "Black",
        section: "Color"
      },
      // 4
      {
        categoryName: "Clear",
        section: "Color"
      },

      // Availability section
      // 5
      {
        categoryName: "Instock",
        section: "Availability"
      },
      // 6
      {
        categoryName: "Outofstock",
        section: "Availability"
      },

      // Furniture section
      // 7
      {
        categoryName: "Table",
        section: "Furniture"
      },
      // 8
      {
        categoryName: "Desk",
        section: "Furniture"
      },
      // 9
      {
        categoryName: "Dresser",
        section: "Furniture"
      },
      // 10
      {
        categoryName: "Bookshelf",
        section: "Furniture"
      },
      // 11
      {
        categoryName: "Chair",
        section: "Furniture"
      },
      // 12
      {
        categoryName: "Stool",
        section: "Furniture"
      },
      // 13
      {
        categoryName: "Sofa",
        section: "Furniture"
      },

      // Location section
      // 14
      {
        categoryName: "Bedroom",
        section: "Location"
      },
      // 15
      {
        categoryName: "Office",
        section: "Location"
      },
      // 16
      {
        categoryName: "Kitchen",
        section: "Location"
      },
      // 17
      {
        categoryName: "Dining",
        section: "Location"
      },
      // 18
      {
        categoryName: "Living",
        section: "Location"
      },
      // 19
      {
        categoryName: "Bathroom",
        section: "Location"
      },
      // 20
      {
        categoryName: "Outdoor",
        section: "Location"
      },
      // 21
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
