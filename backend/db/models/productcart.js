'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "NO ACTION",
      })
      ProductCart.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "NO ACTION",
      })
      ProductCart.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "NO ACTION"
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
    productQuantity: {
      type: DataTypes.INTEGER,
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
