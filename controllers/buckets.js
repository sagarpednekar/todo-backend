const { Bucket } = require("../model/bucket");
module.exports = {
  findAll: async function(req, res) {
    try {
      await Bucket.sync();
      let buckets;
      console.log(req.query.tasks);
      if (req.query.tasks) {
        buckets = await Bucket.findAll({
          include: [
            {
              all: true,
              nested: true
            }
          ]
        });
        res.send({ status: 1, data: buckets });
        return;
      }
      buckets = await Bucket.findAll({});
      res.send({ status: 1, data: buckets });
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
      if (!result) throw new Error("not found");
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
      if (!result) throw new Error("not found");
      res.status(204).send({
        status: 1,
        data: result
      });
    } catch (error) {
      res.status(501).send({ status: 0 });
    }
  }
};
