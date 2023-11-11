'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        // static associate(models) {
        //     Cart.belongsTo(models.User, {
        //         foreignKey: "userId",
        //         onDelete: "CASCADE"
        //     })
        //     // Cart.belongsToMany(models.Product, {
        //     //     through: models.ProductCart,
        //     //     foreignKey: "cartId"
        //     // })

        //     Cart.hasMany(models.ProductCart, {
        //         foreignKey: "cartId",
        //     })
        //     Cart.hasMany(models.Order, {
        //         foreignKey: "cartId",
        //     })
        //     Cart.hasOne(models.StripeSession, {
        //         foreignKey: "cartId",
        //     })
        // }

        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE"
            })
            Cart.belongsToMany(models.Product, {
                through: models.ProductCart,
                foreignKey: "cartId"
            })

            Cart.hasMany(models.ProductCart, {
                foreignKey: "cartId",
                onDelete: "CASCADE" // delete?
            })
            Cart.hasOne(models.StripeSession, {
                foreignKey: "cartId",
            })
        }

        async getCartItems() {
            return this.getProductCarts();
        }
    };

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        sequelize,
        modelName: 'Cart'
    });
    return Cart;
};
