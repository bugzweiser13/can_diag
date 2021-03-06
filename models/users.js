module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this username. Please try to again.'
            },
            validate: {
                len: {
                    args: 6,
                    msg: "Name must be atleast 6 characters in length"
                },
                // fn: function(val) {
                //     if (val !== "mustbethis") throw new Error("Custom validation failed");
                // }
            }
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this password. Please try to again.'
            },
            validate: {
                len: {
                    args: 6,
                    msg: "Name must be atleast 6 characters in length"
                },
                // fn: function(val) {
                //     if (val !== "mustbethis") throw new Error("Custom validation failed");
                // }
            }
        },
        DateUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    }, {
        tableName: 'users'
    });
};