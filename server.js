const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { db, connect } = require("./services/db");
const bucketRoutes = require("./routes/buckets");
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

/**
 * Handle cross origin sharing
 */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
