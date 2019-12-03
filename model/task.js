const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/db");
class Task extends Model {}
Task.init(
  {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "tasks",
    timestamps: true,
    freezeTableName: true,
    tableName: "tasks",
    underscored: true,
    initialAutoIncrement: 1
  }
);

sequelize.sync();

// Task.belongsTo(Bucket);

module.exports = { Task };
