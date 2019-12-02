const { Task } = require("../model/task");
module.exports = {
  findAll: async function(req, res) {
    try {
      await Task.sync();
      const tasks = await Task.findAll({
        // include: [
        //    {
        //       all: true,
        //       nested: true
        //    }
        // ]
      });
      res.send({ status: 1, tasks });
    } catch (error) {
      res.status(501).send({ status: 0 });
    }
  },
  createOne: async function(req, res) {
    try {
      const { task } = req.body;
      await Task.sync();
      const response = await Task.create({
        ...task
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
      const { name, status } = req.body.task;

      const result = await Task.update(
        {
          name,
          status
        },
        {
          where: {
            id
          }
        }
      );

      res.status(200).send({
        status: 1,
        data: []
      });
    } catch (error) {
      res.status(501).send({ status: 0, data: [] });
    }
  },
  findById: async function(req, res) {
    try {
      const { id } = req.params;
      const result = await Task.findOne({ where: { id } });
      if (!result) throw new Error("not found");
      res.status(200).send({
        status: 1,
        data: result
      });
    } catch (error) {
      res.status(501).send({ status: 0, data: [] });
    }
  },
  remove: async function(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("id not found for bucket");
      const result = await Task.destroy({
        where: {
          id
        }
      });
      if (!result) throw new Error("not found");
      res.status(200).send({
        status: 1,
        data: []
      });
    } catch (error) {
      res.status(501).send({ status: 0, data: [] });
    }
  }
};
