"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Klub extends Model {
    static associate(models) {
      /* TODO document why this static method 'associate' is empty */
    }
  }
  Klub.init(
    {
      nama_klub: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      kota_klub: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Klub",
      timestamps: false,
    }
  )
  return Klub
}
