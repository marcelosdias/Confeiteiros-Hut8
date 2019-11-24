const { Model, DataTypes } = require('sequelize')

class Confectionery extends Model {
    static init(sequelize) {
        super.init({
            confectionery_name: DataTypes.STRING,
            responsible: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            description: DataTypes.STRING
        }, { sequelize })
    }

    static associate(models) {
        this.hasMany(models.Address, { 
            foreignKey: 'confectionery_id', 
            as: 'addresses' 
        })

        this.hasMany(models.Product, { 
            foreignKey: 'confectionery_id', 
            as: 'products' 
        })

        this.hasOne(models.Password, {
            foreignKey: 'confectionery_id',
            as: 'password'
        })

        this.belongsToMany(models.Tag, { 
            foreignKey: 'confectionery_id', 
            through: 'conf_tags', 
            as: 'tags'  
        })
    }
}

module.exports = Confectionery