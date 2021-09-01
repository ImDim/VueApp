const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

const start = async () => {
  // Connection to DB
  try {
    const {
      url
    } = require("./config/db.config.js");

    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    console.log("Connected to the database!");
  } catch (error) {
    console.info(error);
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

app.use(cors({
  origin: "http://localhost:8081"
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

require("./routes/post")(app);
require("./routes/auth")(app);

start();