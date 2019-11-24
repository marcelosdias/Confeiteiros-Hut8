const { Model, DataTypes } = require('sequelize')

class Tag extends Model {
    static init(sequelize) {
        super.init({
            tag: DataTypes.STRING,
            type: DataTypes.INTEGER
        }, { sequelize })
    }

    static associate(models) {
        this.belongsToMany(models.Confectionery, { 
            foreignKey: 'tag_id', 
            through: 'conf_tags', 
            as: 'confectioneries' 
        })
    }
}

module.exports = Tag