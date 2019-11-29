module.exports = db => {
  const find = (req, res) => {
    try {
      let query = "SELECT * from `buckets`";

      db.query(query, (err, res) => {
        if (err) throw new Error(err);
        console.log("here", res);
        res.status(200).send({ data: res });
      });
    } catch (error) {
      res.status(501)
    }
  };
  return { find };
};
