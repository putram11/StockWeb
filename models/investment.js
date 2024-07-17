'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.User, { foreignKey: 'userId' });
      Investment.belongsTo(models.Stock, { foreignKey: 'stockId' });
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};