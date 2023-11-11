'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      })
      ProductCategory.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      })
    }
  };

  ProductCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductCategory'
  });
  return ProductCategory;
};
