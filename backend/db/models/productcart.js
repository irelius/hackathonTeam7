'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      ProductCart.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
      })
      ProductCart.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE"
      })
    }
  };
  ProductCart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    pricePerUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};
