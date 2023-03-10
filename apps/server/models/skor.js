"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    static associate(models) {
      Scores.belongsTo(models.Clubs, {
        foreignKey: "id_klub1",
      }),
        Scores.belongsTo(models.Clubs, {
          foreignKey: "id_klub2",
        })
    }
  }
  Scores.init(
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
      modelName: "Scores",
      timestamps: false,
    }
  )
  return Scores
}
