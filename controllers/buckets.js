const { db } = require("../services/db");
const mysql = require("mysql");

module.exports = {
  findAll: function(req, res) {
    try {
      const query = "SELECT * from `buckets`";
      db.query(query, (err, result, fields) => {
        if (err) throw new Error(err);
        console.log(fields);
        res.status(200).send({ data: result });
      });
    } catch (error) {
      res.status(501);
    }
  },
  findById: function(req, res) {
    try {
      const { id } = req.params;
      const query = "select * from `buckets` where id=" + id;
      if (!id) throw new Error("id not found for bucket");
      db.query(query, (err, result) => {
        if (err) throw new Error(err);
        res.status(200).send({
          data: result
        });
      });
    } catch (error) {
      res.status(501);
    }
  },
  insert: function(req, res) {
    try {
      const { bucket } = req.body;
      if (bucket && !Object.keys(bucket).length > 0)
        throw new Error("Provide bucket details ");
      const { name, todos, labels } = bucket;
      const insertQuery =
        "INSERT INTO buckets (name,todos,labels) VALUES (?,?,?)";
      const query = mysql.format(insertQuery, [name, todos, labels]);
      db.query(query, (err, result) => {
        if (err) throw new Error(err);
        res.status(201).send({
          data: {
            id: result.insertId,
            name,
            todos,
            labels
          }
        });
      });
    } catch (error) {
      res.status(501);
    }
  },
  remove: function(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("id not found for bucket");
      const query = "delete from `buckets` where id=" + id;
      db.query(query, (err, result) => {
        if (err) throw new Error(err);
        res.status(204).send({
          data: result
        });
      });
    } catch (error) {
      res.status(501);
    }
  },
  update: function(req, res) {
    try {
      const { id } = req.params;
      const { name, todos, labels } = req.body.bucket;
      const updateQuery =
        "UPDATE buckets SET name=?,todos=?,labels=? where id=?";
      const query = mysql.format(updateQuery, [
        name,
        JSON.stringify(todos),
        JSON.stringify(labels),
        id
      ]);
      db.query(query, (err, result, fields) => {
        if (err) throw new Error(err);
        res.status(204).send({
          msg: "Updated"
        });
      });
    } catch (error) {
      res.status(501);
    }
  }
};
