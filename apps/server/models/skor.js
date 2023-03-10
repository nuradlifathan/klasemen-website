"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Skor extends Model {
    static associate(models) {
      Skor.belongsTo(models.Klub, {
        foreignKey: "id_klub1",
      }),
        Skor.belongsTo(models.Klub, {
          foreignKey: "id_klub2",
        })
    }
  }
  Skor.init(
    {
      skor_klub1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skor_klub2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Skor",
      timestamps: false,
    }
  )
  return Skor
}
