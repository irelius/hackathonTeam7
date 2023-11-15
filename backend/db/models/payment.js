
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User), {
        foreignKey: "userId",
        onDelete: "NO ACTION"
      }
    }
  };

  Payment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    defaultPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    cardHolder: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Payment'
  });
  return Payment;
};
