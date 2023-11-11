
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        static associate(models) { }
    };

    Discount.init({
        codeName: {
            type: DataTypes.STRING,
        },
        applicableCategory: {
            type: DataTypes.STRING,
            defaultValue: "All"
        },
        discountType: {
            type: DataTypes.STRING
        },
        discountValue: {
            type: DataTypes.INTEGER
        },
        expirationDate: {
            type: DataTypes.DATEONLY
        }
    }, {
        sequelize,
        modelName: 'Discount'
    });
    return Discount;
};
