const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/db");
class Task extends Model {}
Task.init(
  {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
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
//   .then(() =>
//     User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20)
//     })
//   )
//   .then(jane => {
//     console.log(jane.toJSON());
//   });

module.exports = { Task };
