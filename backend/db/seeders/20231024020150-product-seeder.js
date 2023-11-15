'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Products'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validProducts = [
      {
        productName: "Simple Side Table",
        productDescription: "A versatile addition to your living space, this Simple Side Table provides a clean and understated design. Its neutral appearance allows it to effortlessly complement any decor style. Crafted with quality materials, this table offers both form and function.",
        productPrice: 7999,
        productQuantity: 3
      },
      {
        productName: "Minimalist Accent Table",
        productDescription: "Enhance your living space with the Minimalist Accent Table. Its sleek and timeless design makes it an ideal addition to any room. Crafted for durability and style, this table effortlessly balances form and function.",
        productPrice: 8999,
        productQuantity: 7
      },
      {
        productName: "Functional End Table",
        productDescription: "The Functional End Table is designed to meet your everyday needs. Its unassuming design ensures it fits seamlessly into any space. Crafted with quality materials, this table offers both utility and style.",
        productPrice: 7499,
        productQuantity: 5
      },
      {
        productName: "Neutral Side Table",
        productDescription: "The Neutral Side Table is the epitome of adaptability. Its timeless design effortlessly complements various decor styles. Crafted for both durability and aesthetic appeal, this table enhances your space.",
        productPrice: 8499,
        productQuantity: 9
      },
      {
        productName: "Contemporary Accent Table",
        productDescription: "Upgrade your decor with the Contemporary Accent Table. Its modern yet versatile design ensures it can enhance any room. Crafted with precision and style in mind, this table offers both form and function.",
        productPrice: 9999,
        productQuantity: 2
      },
      {
        productName: "Basic Side Table",
        productDescription: "The Basic Side Table serves as a simple and functional addition to your space. With a minimalist design, it can seamlessly blend into any room. This table fulfills its purpose without overshadowing your decor.",
        productPrice: 7499,
        productQuantity: 4
      },
      {
        productName: "Essential Coffee Table",
        productDescription: "The Essential Coffee Table combines simplicity and practicality. Its timeless design fits seamlessly into any room, serving as the perfect centerpiece. Crafted for durability and style, this coffee table enhances your living area without overpowering it.",
        productPrice: 14999,
        productQuantity: 8
      },
      {
        productName: "Minimalist Center Table",
        productDescription: "The Minimalist Center Table offers a clean and versatile focal point for your living space. Its understated design complements a wide range of decor styles. Crafted with quality materials, this table balances both form and function.",
        productPrice: 13999,
        productQuantity: 6
      },
      {
        productName: "Functional Coffee Table",
        productDescription: "The Functional Coffee Table is designed to meet your daily needs. Its unassuming design ensures it fits seamlessly into any room. Crafted for both durability and style, this table enhances your space without overwhelming it.",
        productPrice: 12999,
        productQuantity: 10
      },
      {
        productName: "Neutral Coffee Table",
        productDescription: "The Neutral Coffee Table is a versatile addition to your interior. Its timeless design effortlessly fits into various decor styles. Crafted with quality materials, this table offers both utility and aesthetic appeal.",
        productPrice: 13999,
        productQuantity: 7
      },
      {
        productName: "Contemporary Center Table",
        productDescription: "Elevate your living space with the Contemporary Center Table. Its modern and adaptable design makes it a suitable addition to any room. Crafted with precision and style in mind, this table seamlessly combines form and function.",
        productPrice: 15999,
        productQuantity: 12
      },
      {
        productName: "Basic Coffee Table",
        productDescription: "The Basic Coffee Table serves as a simple and effective centerpiece for your space. With a minimalist design, it blends effortlessly into any room. This table fulfills its primary purpose without dominating your decor.",
        productPrice: 12999,
        productQuantity: 9
      },
      {
        productName: "Essential Sofa",
        productDescription: "The Essential Sofa provides a comfortable and adaptable seating solution for your living area. Its design is neutral and versatile, making it suitable for various decor styles. Crafted for both comfort and aesthetics, this sofa complements your space.",
        productPrice: 299999,
        productQuantity: 15
      },
      {
        productName: "Simple Sectional",
        productDescription: "The Simple Sectional offers a straightforward and functional seating option for your space. Its timeless design effortlessly fits into any room. Crafted with quality materials, this sectional serves both practicality and style.",
        productPrice: 349999,
        productQuantity: 14
      },
      {
        productName: "Functional Couch",
        productDescription: "The Functional Couch is designed to meet your seating needs while maintaining a neutral appearance. Crafted for both durability and comfort, it seamlessly adapts to various living spaces and decor styles.",
        productPrice: 329999,
        productQuantity: 17
      },
      {
        productName: "Neutral Sofa",
        productDescription: "The Neutral Sofa offers an inviting and adaptable seating solution for your space. Its design is neutral and timeless, making it suitable for a range of decor styles. Crafted for both comfort and aesthetic appeal, this sofa enhances your interior.",
        productPrice: 349999,
        productQuantity: 12
      },
      {
        productName: "Contemporary Sectional",
        productDescription: "Elevate your seating with the Contemporary Sectional. Its modern design adapts seamlessly to various living spaces and decor styles. Crafted with precision and comfort in mind, this sectional seamlessly combines form and function.",
        productPrice: 379999,
        productQuantity: 18
      },
      {
        productName: "Basic Loveseat",
        productDescription: "The Basic Loveseat offers a simple and comfortable seating solution for your space. With a minimalist design, it can fit effortlessly into any room. This loveseat serves its primary purpose without overshadowing your decor.",
        productPrice: 299999,
        productQuantity: 13
      },
      {
        productName: "Basic Floor Lamp",
        productDescription: "The Basic Floor Lamp provides simple and effective lighting for your space. With a minimalist design, it can fit effortlessly into any room. This lamp serves its primary purpose without overshadowing your interior decor.",
        productPrice: 7999,
        productQuantity: 22
      },
      {
        productName: "Essential Table Lamp",
        productDescription: "The Essential Table Lamp offers straightforward and functional illumination for your space. With a timeless design, it fits seamlessly into any room. This lamp serves its purpose without overwhelming your interior decor.",
        productPrice: 6999,
        productQuantity: 20
      },
      {
        productName: "Functional Chandelier Lamp",
        productDescription: "The Functional Chandelier Lamp provides versatile and effective lighting for your space. With its neutral design, it effortlessly complements any room. Crafted for both durability and aesthetics, this lamp enhances your interior.",
        productPrice: 12999,
        productQuantity: 24
      },
      {
        productName: "Neutral Desk Lamp",
        productDescription: "The Neutral Desk Lamp offers simple and efficient lighting for your workspace. Its timeless design adapts to various interior settings. Crafted with quality materials, this lamp balances utility and style.",
        productPrice: 8999,
        productQuantity: 19
      },
      {
        productName: "Contemporary Pendant Lamp",
        productDescription: "Elevate your interior with the Contemporary Pendant Lamp. Its modern design blends effortlessly into various decor styles. Crafted with precision and aesthetics in mind, this pendant lamp combines both form and function.",
        productPrice: 14999,
        productQuantity: 21
      },
      {
        productName: "Basic Lamp Fixture",
        productDescription: "The Basic Lamp Fixture offers simple and effective lighting for your space. With a minimalist design, it can seamlessly fit into any room. This fixture fulfills its primary purpose without dominating your interior decor.",
        productPrice: 8999,
        productQuantity: 23
      }
    ]

    await queryInterface.bulkInsert(options, validProducts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
