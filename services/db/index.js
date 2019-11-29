const mysql = require("mysql");

const {
  host,
  user,
  password,
  database
} = require("../../config").config.dev.db;

module.exports = {
  db: mysql.createConnection({
    host,
    user,
    password,
    database
  }),
  connect: db => {
    try {
      db.connect(err => {
        if (err) throw new Error(err);
        console.log("Connection to mysql successfull");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
