'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: models.ProductCategory,
                foreignKey: "productId",
            });

            Product.hasMany(models.Review, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            });
            Product.hasMany(models.ProductImage, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            });
            Product.hasMany(models.ProductCart, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            });
            Product.hasMany(models.ProductCategory, {
                foreignKey: "productId",
                onDelete: "CASCADE",
            });
        }
    };

    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Product'
    });
    return Product;
};
