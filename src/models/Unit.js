const { Model, DataTypes } = require('sequelize')

class Unit extends Model {
    static init(sequelize) {
        super.init({
            unit: DataTypes.STRING
        }, { sequelize })
    }

    static associate(models) {
        this.belongsToMany(models.Product, { 
            foreignKey: 'unit_id', 
            through: 'product_units', 
            as: 'products' 
        })
    }
}

module.exports = Unit