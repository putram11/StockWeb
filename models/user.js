'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcryptjs`);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: 'userId' });
      User.belongsToMany(models.Stock, { 
        through: models.Investment,
        foreignKey: `stockId` 
      });
      User.hasMany(models.Investment, {foreignKey: `userId`})
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Username is required`
        },
        notNull: {
          msg: `Username is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is required`
        },
        notNull: {
          msg: `Password is required`
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        notNull: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Email is wrong`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Role is required`
        },
        notNull: {
          msg: `Role is required`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook(`beforeCreate`, (user, opt) => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  })

  
  return User;
};