"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.AuditCarTrail, {
        foreignKey: "carId",
        as: "AuditCarTrail",
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      category: DataTypes.ENUM(["Small", "Medium", "Large"]),
      imageUrl: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      },
      available: { type: DataTypes.BOOLEAN, defaultValue: true },
      deleteAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
      deletedAt: "deleteAt",
    }
  );
  return Car;
};
