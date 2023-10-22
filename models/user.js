"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Auth, {
        foreignKey: "userId",
      });
      User.hasMany(models.AuditCarTrail, {
        foreignKey: "performedBy",
        as: "AuditCarTrail",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      role: {
        type: DataTypes.ENUM(["SuperAdmin", "Admin", "Member"]),
        defaultValue: "Member",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
