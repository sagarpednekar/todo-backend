const { Bucket } = require("../model/bucket");
module.exports = {
  findAll: async function(req, res) {
    try {
      await Bucket.sync();
      const buckets = await Bucket.findAll({
        // include: [
        //    {
        //       all: true,
        //       nested: true
        //    }
        // ]
      });
      console.log(buckets);
      res.send({ buckets });
    } catch (error) {
      res.status(501);
    }
  },
  createOne: async function(req, res) {
    try {
      const { bucket } = req.body;
      await Bucket.sync();
      const response = await Bucket.create({
        ...bucket
      });
      res.status(201).send({
        status: 1,
        data: response
      });
    } catch (error) {
      res.status(501).send({
        status: 0,
        data: []
      });
    }
  },

  update: async function(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body.bucket;

      const result = await Bucket.update(
        {
          name
        },
        {
          where: {
            id
          }
        }
      );

      res.status(204).send({
        status: 1,
        data: result
      });
    } catch (error) {
      res.status(501);
    }
  },
  findById: async function(req, res) {
    try {
      const { id } = req.params;
      const result = await Bucket.findOne({ where: { id } });
      if(!result) throw new Error("not found")
      res.status(200).send({
        status: 1,
        data: result
      });
    } catch (error) {
      res.status(501).send({ status: 0 });
    }
  },

  remove: async function(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("id not found for bucket");
      const result = await Bucket.destroy({
        where: {
          id
        }
      });
      if(!result) throw new Error("not found")
      res.status(204).send({
        status: 1,
        data: result
      });
    } catch (error) {
      res.status(501).send({ status: 0 });
    }
  }
  //    // insert: function(req, res) {
  //    //   try {
  //    //     const { bucket } = req.body;
  //    //     if (bucket && !Object.keys(bucket).length > 0)
  //    //       throw new Error("Provide bucket details ");
  //    //     const { name, todos, labels } = bucket;
  //    //     const insertQuery =
  //    //       "INSERT INTO buckets (name,todos,labels) VALUES (?,?,?)";
  //    //     const query = mysql.format(insertQuery, [name, todos, labels]);
  //    //     db.query(query, (err, result) => {
  //    //       if (err) throw new Error(err);
  //    //       res.status(201).send({
  //    //         data: {
  //    //           id: result.insertId,
  //    //           name,
  //    //           todos,
  //    //           labels
  //    //         }
  //    //       });
  //    //     });
  //    //   } catch (error) {
  //    //     res.status(501);
  //    //   }
  //    // },
  //
  //    // update: function(req, res) {
  //    //   try {
  //    //     const { id } = req.params;
  //    //     const { name, todos, labels } = req.body.bucket;
  //    //     const updateQuery =
  //    //       "UPDATE buckets SET name=?,todos=?,labels=? where id=?";
  //    //     const query = mysql.format(updateQuery, [
  //    //       name,
  //    //       JSON.stringify(todos),
  //    //       JSON.stringify(labels),
  //    //       id
  //    //     ]);
  //    //     db.query(query, (err, result, fields) => {
  //    //       if (err) throw new Error(err);
  //    //       res.status(204).send({
  //    //         msg: "Updated"
  //    //       });
  //    //     });
  //    //   } catch (error) {
  //    //     res.status(501);
  //    //   }
  //    // }
};
