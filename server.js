const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { db, connect } = require("./services/db");
const bucketRoutes = require("./routes/buckets");
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

// connect mysql database

connect(db);

/***
 * Bind controllers
 */

// call routes


app.use(bucketRoutes);

app.listen(PORT, () => {
  console.log(`Server is shining on port ${PORT}`);
});
