const { Model, DataTypes } = require('sequelize')

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.FLOAT,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Confectionery, { 
            foreignKey: 'confectionery_id', 
            as: 'confectionery' 
        })

        this.belongsToMany(models.Unit, { 
            foreignKey: 'product_id', 
            through: 'product_units', 
            as: 'units' 
        })
    }
}

module.exports = Product