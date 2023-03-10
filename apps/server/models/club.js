"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Clubs extends Model {
    static associate(models) {}
  }
  Clubs.init(
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
      modelName: "Clubs",
      timestamps: false,
    }
  )
  return Clubs
}
