'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: models.ProductCategory,
                foreignKey: "productId",
            });
            Product.belongsToMany(models.Cart, {
                through: models.ProductCart,
                foreignKey: "productId",
            });

            Product.hasMany(models.Review, {
                foreignKey: "productId",
            });
            Product.hasMany(models.ProductImage, {
                foreignKey: "productId",
            });
            Product.hasMany(models.ProductCategory, {
                foreignKey: "productId",
            });
            Product.hasMany(models.ProductCart, {
                foreignKey: "productId",
            });
            Product.hasMany(models.Order, {
                foreignKey: "productId",
            });

        }
    };

    Product.init({
        productName: {
            type: DataTypes.STRING,
        },
        productDescription: {
            type: DataTypes.STRING(2000),
        },
        productPrice: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Product'
    });
    return Product;
};
