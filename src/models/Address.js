const { Model, DataTypes } = require('sequelize')

class Address extends Model {
    static init(sequelize) {
        super.init({
            zipcode: DataTypes.STRING,
            state: DataTypes.STRING,
            city: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
            complement: DataTypes.STRING
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Confectionery, { 
            foreignKey: 'confectionery_id', 
            as: 'confectionery' 
        })
    }
}

module.exports = Address