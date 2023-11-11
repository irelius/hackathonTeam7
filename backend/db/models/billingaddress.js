'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BillingAddress extends Model {
    static associate(models) {
      BillingAddress.belongsTo(models.User), {
        foreignKey: "userId",
        onDELETE: "CASCADE"
      }
    }
  }
  BillingAddress.init({
    billingFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingZipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'BillingAddress',
  });
  return BillingAddress;
};
