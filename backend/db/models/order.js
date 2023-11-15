
'use strict';
const { Model, DATEONLY } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "NO ACTION"
      })
    }
  };

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "processing"
    },
    totalAmount: {
      type: DataTypes.INTEGER,
    }
  },
    {
      sequelize,
      modelName: 'Order',
      hooks: {
        beforeCreate: (order) => {
          // Calculate totalAmount before creating the record
          order.totalAmount = order.productQuantity * order.pricePerUnit;
        },
      },
    }
  );


  // // Calculate and assign the totalAmount separately
  // Order.beforeCreate((order, options) => {
  //   order.totalAmount = order.productQuantity * order.pricePerUnit;
  // });

  return Order;
};
