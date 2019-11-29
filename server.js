const express = require("express");
const bodyParser = require("body-parser");
const { db, connect } = require("./services/db");

const app = express();
const PORT = process.env.PORT || 4000;

// connect mysql database
connect(db);

require("./controllers/buckets")(db);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is shining on port ${PORT}`);
});
