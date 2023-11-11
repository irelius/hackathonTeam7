
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      Review.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE"
      })
    }
  };

  Review.init({
    review: {
      type: DataTypes.STRING(2000)
    },
    rating: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Review'
  });
  return Review;
};
