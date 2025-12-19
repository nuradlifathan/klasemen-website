"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.hasMany(models.Match, { onDelete: "CASCADE" })
    }
  }
  Club.init(
    {
      team: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      menang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      seri: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      kalah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      goal_masuk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      goal_kemasukan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Club",
      timestamps: false,
    }
  )
  return Club
}
