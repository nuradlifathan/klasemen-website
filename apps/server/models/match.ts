"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.Club)
    }
  }
  Match.init(
    {
      opponent_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Match",
      timestamps: false,
    }
  )
  return Match
}
