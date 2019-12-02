const {
  findAll,
  findById,
  createOne,
  remove,
  update
} = require("../controllers/tasks");

const router = require("express").Router();

router.get("/tasks", findAll);
router.get("/task/:id", findById);
router.post("/task/new", createOne);
router.put("/task/:id", update);
router.delete("/task/:id", remove);

module.exports = router;
