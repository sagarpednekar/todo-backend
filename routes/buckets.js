const {
  findAll,
  findById,
  createOne,
  remove,
  update
} = require("../controllers/buckets");

const router = require("express").Router();

router.get("/buckets", findAll);
router.get("/bucket/:id", findById);
router.post("/bucket/new", createOne);
router.put("/bucket/:id", update);
router.delete("/bucket/:id", remove);

module.exports = router;
