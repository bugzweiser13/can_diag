/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gencanres', {
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
    start_year: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    end_year: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    net_id: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    test_loc: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    pin_h: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    pin_l: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    res_val_m: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    res_val_f: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    term_m: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    term_f: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tot_res: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    DateUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdAt: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    genvehlistId: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'gencanres'
  });
};
