'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StripeSession extends Model {
    static associate(models) {
      StripeSession.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      StripeSession.belongsTo(models.Cart, {
        foreignKey: "cartId",
      })
    }
  }
  StripeSession.init({
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'StripeSession',
  });
  return StripeSession;
};
