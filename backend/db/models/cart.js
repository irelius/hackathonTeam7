'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                // onDelete: "CASCADE"
            })

            Cart.hasOne(models.StripeSession, {
                foreignKey: "cartId",
                onDelete: "CASCADE"
            })
            Cart.hasMany(models.ProductCart, {
                foreignKey: "cartId",
                onDelete: "CASCADE"
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
            autoIncrement: true,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Cart'
    });
    return Cart;
};
