'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'ProductCategories'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validProductCategories = [
      // Product 1: Simple Side Table
      {
        productId: 1,
        categoryId: 1 // All
      },
      {
        productId: 1,
        categoryId: 3 // Black
      },
      {
        productId: 1,
        categoryId: 5 // Instock
      },
      {
        productId: 1,
        categoryId: 13 // Sofa
      },
      {
        productId: 1,
        categoryId: 18 // Living
      },
      {
        productId: 1,
        categoryId: 21 // Indoor
      },

      // Product 2: Minimalist Accent Table
      {
        productId: 2,
        categoryId: 1 // All
      },
      {
        productId: 2,
        categoryId: 2 // White
      },
      {
        productId: 2,
        categoryId: 5 // Instock
      },
      {
        productId: 2,
        categoryId: 7 // Table
      },
      {
        productId: 2,
        categoryId: 17 // Dining
      },
      {
        productId: 2,
        categoryId: 21 // Indoor
      },


      // Product 3: Functional End Table
      {
        productId: 3,
        categoryId: 1 // All
      },
      {
        productId: 3,
        categoryId: 3 // Black
      },
      {
        productId: 3,
        categoryId: 5 // Instock
      },
      {
        productId: 3,
        categoryId: 7 // Table
      },
      {
        productId: 3,
        categoryId: 18 // Living
      },
      {
        productId: 3,
        categoryId: 21 // Indoor
      },


      // Product 4: Neutral Side Table
      {
        productId: 4,
        categoryId: 1 // All
      },
      {
        productId: 4,
        categoryId: 4 // Clear
      },
      {
        productId: 4,
        categoryId: 5 // Instock
      },
      {
        productId: 4,
        categoryId: 8 // Desk
      },
      {
        productId: 4,
        categoryId: 15 // Office
      },
      {
        productId: 4,
        categoryId: 18 // Living
      },
      {
        productId: 4,
        categoryId: 21 // Indoor
      },


      // Product 5: Contemporary Accent Table
      {
        productId: 5,
        categoryId: 1 // All
      },
      {
        productId: 5,
        categoryId: 2 // White
      },
      {
        productId: 5,
        categoryId: 5 // Instock
      },
      {
        productId: 5,
        categoryId: 10 // Bookshelf
      },
      {
        productId: 5,
        categoryId: 14 // Bedroom
      },
      {
        productId: 5,
        categoryId: 15 // Office
      },
      {
        productId: 5,
        categoryId: 18 // Living
      },
      {
        productId: 5,
        categoryId: 21 // Indoor
      },

      // Product 6: Basic Side Table
      {
        productId: 6,
        categoryId: 1 // All
      },
      {
        productId: 6,
        categoryId: 3 // Black
      },
      {
        productId: 6,
        categoryId: 5 // Instock
      },
      {
        productId: 6,
        categoryId: 14 // Bedroom
      },
      {
        productId: 6,
        categoryId: 21 // Indoor
      },


      // Product 7: Essential Coffee Table
      {
        productId: 7,
        categoryId: 1 // All
      },
      {
        productId: 7,
        categoryId: 3 // Black
      },
      {
        productId: 7,
        categoryId: 5 // Instock
      },
      {
        productId: 7,
        categoryId: 11 // Chair
      },
      {
        productId: 7,
        categoryId: 18 // Living
      },
      {
        productId: 7,
        categoryId: 20 // Outdoor
      },
      {
        productId: 7,
        categoryId: 21 // Indoor
      },


      // Product 8: Minimalist Center Table
      {
        productId: 8,
        categoryId: 1 // All
      },
      {
        productId: 8,
        categoryId: 3 // Black
      },
      {
        productId: 8,
        categoryId: 5 // Instock
      },
      {
        productId: 8,
        categoryId: 12 // Stool
      },
      {
        productId: 8,
        categoryId: 14 // Bedroom
      },
      {
        productId: 8,
        categoryId: 18 // Living
      },
      {
        productId: 8,
        categoryId: 21 // Indoor
      },


      // Product 9: Functional Coffee Table
      {
        productId: 9,
        categoryId: 1 // All
      },
      {
        productId: 9,
        categoryId: 2 // White
      },
      {
        productId: 9,
        categoryId: 5 // Instock
      },
      {
        productId: 9,
        categoryId: 9 // Dresser
      },
      {
        productId: 9,
        categoryId: 14 // Bedroom
      },
      {
        productId: 9,
        categoryId: 21 // Indoor
      },


      // Produt 10: Neutral Coffee Table
      {
        productId: 10,
        categoryId: 1 // All
      },
      {
        productId: 10,
        categoryId: 3 // Black
      },
      {
        productId: 10,
        categoryId: 5 // Instock
      },
      {
        productId: 10,
        categoryId: 11 // Chair
      },
      {
        productId: 10,
        categoryId: 12 // Stool
      },
      {
        productId: 10,
        categoryId: 17 // Dining
      },
      {
        productId: 10,
        categoryId: 18 // Living
      },
      {
        productId: 10,
        categoryId: 21 // Indoor
      },
    ]

    await queryInterface.bulkInsert(options, validProductCategories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
