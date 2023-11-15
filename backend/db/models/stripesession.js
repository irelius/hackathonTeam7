'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StripeSession extends Model {
    static associate(models) {
      StripeSession.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "NO ACTION"
      })
      StripeSession.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "NO ACTION"
      })
    }
  }
  StripeSession.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'StripeSession',
  });
  return StripeSession;
};
