'use strict';
const {
  Model
} = require('sequelize');
const { formatDate } = require('../helpers/toFormatDate');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
    }

    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }

    get toFormatDate(){
      return formatDate(this.dateOfBirth)
    }

    dateForUpdate(values){
      return values = this.dateOfBirth.toISOString().split(`T`)[0]
    }
    
  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: `Users`,
        key: `userId`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};