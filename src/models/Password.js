const { Model, DataTypes } = require('sequelize')

class Password extends Model {
    static init(sequelize) {
        super.init({
            password: DataTypes.STRING
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Confectionery, { 
            foreignKey: 'confectionery_id', 
            as: 'confectionery' 
        })
    }
}

module.exports = Password