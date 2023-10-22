"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditCarTrail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuditCarTrail.belongsTo(models.Car, {
        foreignKey: "carId",
      });
      AuditCarTrail.belongsTo(models.User, {
        foreignKey: "performBy",
      });
    }
  }
  AuditCarTrail.init(
    {
      carId: DataTypes.INTEGER,
      action: DataTypes.ENUM(["Create", "Update", "Delete"]),
      performBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AuditCarTrail",
    }
  );
  return AuditCarTrail;
};
