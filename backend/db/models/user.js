
'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Payment, {
        foreignKey: "userId"
      })
      User.hasMany(models.BillingAddress, {
        foreignKey: "userId"
      })
      User.hasMany(models.ShippingAddress, {
        foreignKey: "userId"
      })
      User.hasMany(models.Order, {
        foreignKey: "userId",
      })
      User.hasMany(models.Review, {
        foreignKey: "userId"
      })
      User.hasMany(models.Cart, {
        foreignKey: "userId"
      })
      User.hasMany(models.StripeSession, {
        foreignKey: "userId"
      })
    }
  };

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "customer"
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
