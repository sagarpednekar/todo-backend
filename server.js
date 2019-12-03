const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { connect } = require("./services/db");
const bucketRoutes = require("./routes/buckets");
const taskRoutes = require("./routes/tasks");
var cors = require('cors');
app.use(cors());
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

connect();

/***
 * Bind controllers
 */

// call routes

app.use(bucketRoutes);
app.use(taskRoutes);

app.get("/", (req, res) => {
  res.status(200).send("API engine");
});

app.listen(PORT, () => {
  console.log(`Server is shining on port ${PORT}`);
});
