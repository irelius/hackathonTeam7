'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "NO ACTION",
      })
      ProductCategory.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "NO ACTION",
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
