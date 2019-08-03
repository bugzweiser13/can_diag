/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('posts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		model: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		model_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		sub_model: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		start_year: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'posts'
	});
};
