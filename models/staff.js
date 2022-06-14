'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Staff.init({
    name: DataTypes.STRING,
    role: DataTypes.ENUM('Presidente', 'CEO', 'Fundador', 'Fundadora', 'Colaborador', 'Colaboradora'),
    image: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};