/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('gencanvolts', {
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
		net_id: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		tr_loc: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		test_loc: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		volt_h: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		volt_l: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		DateUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'gencanvolts'
	});
};
