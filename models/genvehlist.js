/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    var genvehlist = sequelize.define('genvehlist', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: false
        },
        model: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        model_num: {
            type: DataTypes.INTEGER(3),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        model_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
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

    genvehlist.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        genvehlist.hasMany(models.gencanres, {
            foreignKey: "model_num",
        });
        genvehlist.hasMany(models.gencanvolts, {
            foreignKey: "model_num"
        });
        genvehlist.hasMany(models.genmedia, {
            foreignKey: "model_num"
        });
    };

    return genvehlist;

};