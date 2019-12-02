// const mysql = require("mysql");
const Sequelize = require("sequelize");

const {
   host,
   user,
   password,
   database,
   dialect
} = require("../../config").config.dev.db;

const sequelize = new Sequelize(database, user, password, {
   host,
   dialect
});

module.exports = {
   sequelize,
   Sequelize,
   connect: () => {
      try {
         sequelize
            .authenticate()
            .then(res => {
               console.log("Connection successfull");
            })
            .catch(err => {
               if (err) throw new Error(err);
            });
      } catch (error) {
         console.log(error);
      }
   }
};
