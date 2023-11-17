'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiscountCategory extends Model {
    static associate(models) {
      DiscountCategory.belongsTo(models.Discount, {
        foreignKey: "discountId",
        onDelete: "NO ACTION"
      })
      DiscountCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "NO ACTION"
      })
    }
  }
  DiscountCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'DiscountCategory',
  });
  return DiscountCategory;
};
