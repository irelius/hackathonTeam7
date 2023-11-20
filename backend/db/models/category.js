'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: models.ProductCategory,
        foreignKey: "categoryId",
        onDelete: "CASCADE"
      })
      Category.belongsToMany(models.Discount, {
        through: models.DiscountCategory,
        foreignKey: "categoryId",
        onDelete: "CASCADE"
      })

      Category.hasMany(models.ProductCategory, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
      Category.hasMany(models.DiscountCategory, {
        foreignKey: "categoryId",
        onDelete: "CASCADE"
      })
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    categoryName: {
      type: DataTypes.STRING,
      defaultValue: "All",
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
