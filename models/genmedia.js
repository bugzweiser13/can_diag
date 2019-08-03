/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('genmedia', {
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
		model_img: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		c_can_img: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		p_can_img1: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		p_can_img2: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		test_loc_img: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		DateUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'genmedia'
	});
};
