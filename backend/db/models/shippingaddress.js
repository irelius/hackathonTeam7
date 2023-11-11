
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    static associate(models) {
      ShippingAddress.belongsTo(models.User), {
        foreignKey: "userId",
        onDelete: "CASCADE",
      }
    }
  };

  ShippingAddress.init({
    shippingFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingZipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ShippingAddress'
  });
  return ShippingAddress;
};
