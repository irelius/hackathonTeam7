'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Reviews'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validReviews = [
      {
        userId: 2,
        productId: 1,
        review: "I couldn't be happier with this sofa! It's a perfect blend of modern aesthetics and timeless elegance. The buttery-soft leather is a dream to sink into after a long day. I find myself spending more time in my living room just to enjoy this piece. It's truly a showstopper!",
        rating: 5,
      },
      {
        userId: 2,
        productId: 3,
        review: "I've been searching for a coffee table that perfectly complements my modern living room, and the Aura coffee table is close to ideal. It's sleek, sturdy, and minimalist, just as described. The only reason it's not a full 5 stars is because I'd prefer it in a slightly larger size. But overall, I'm quite satisfied.",
        rating: 4,
      },
      {
        userId: 2,
        productId: 4,
        review: "The glass desk looks stunning in my modern office. It's a real eye-catcher. However, I've noticed that the glass top scratches quite easily, which is a bit disappointing for the price. It's a good desk if you're careful with it.",
        rating: 3,
      },
      {
        userId: 3,
        productId: 1,
        review: "I'm all about modern design, and the Luxe leather sofa hits the mark. It's incredibly comfortable and adds a touch of elegance to my home. The leather is so soft, and the overall quality is outstanding. I'm delighted with this purchase and how it complements my decor.",
        rating: 5,
      },
      {
        userId: 3,
        productId: 7,
        review: "This chair is a lovely piece of furniture. It's well-made, and the design is a real eye-catcher. I only wish the color options were more diverse. Otherwise, it's a great addition to any home.",
        rating: 4,
      },
      {
        userId: 3,
        productId: 8,
        review: "The Nuovo Ottoman is an absolute showstopper. It's incredibly stylish and versatile. I can use it as extra seating when I have guests over. It is a little too firm making extended lounging sessions a bit uncomfortable.",
        rating: 4,
      },
      {
        userId: 3,
        productId: 10,
        review: "The Art Deco Bar Stools are simply exquisite. They bring a touch of old-world glamour to my kitchen. I love the unique geometric patterns, and they're surprisingly comfortable. A five-star product, no doubt!",
        rating: 5,
      },
      {
        userId: 4,
        productId: 9,
        review: "I appreciate the craftsmanship, but this dresser is a bit much for my taste. It's beautifully detailed, but it just doesn't blend well with my modern décor. If you love the Rococo style, this is for you, but I found it too ornate. Honestly, I don't know why this product is listed on this site.",
        rating: 2,
      },
    ]

    await queryInterface.bulkInsert(options, validReviews, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
