
'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Payment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Address, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Order, {
        foreignKey: "userId",
      })
      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      User.hasMany(models.ProductCart, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Cart, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      User.hasMany(models.StripeSession, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
    }
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      unique: true,
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
