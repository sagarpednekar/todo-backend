const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../services/db");
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
//   .then(() =>
//     User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20)
//     })
//   )
//   .then(jane => {
//     console.log(jane.toJSON());
//   });

module.exports = { Bucket };
