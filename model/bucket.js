const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/db");
const { Task } = require("../model/task");
class Bucket extends Model {}
Bucket.init(
  {
    name: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "buckets",
    timestamps: true,
    freezeTableName: true,
    tableName: "buckets",
    underscored: true,
    initialAutoIncrement: 1
  }
);

sequelize.sync();

Bucket.hasMany(Task);

module.exports = { Bucket };
