/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('genvehlist', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        model_num: {
            type: DataTypes.INTEGER(3),
            allowNull: false
        },
        model_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        sub_model: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        start_year: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        end_year: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        DateUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'genvehlist'
    });
};