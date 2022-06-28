'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Public extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Public.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    welcomeTitle: DataTypes.STRING,
    welcomeText: DataTypes.STRING,
    welcomeImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Public',
  });
  return Public;
};