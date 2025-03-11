const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;



// From env flie
const port = process.env.PORT || 8080;

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// local modules
const mongodb = require("./src/database/connect");

// Express
const app = express();
app.use(bodyParser.json());


// Middleware

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./src/routes"));



// local mongodb connection and server start
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Project Connected to DB and listening on ${port}`);
    }
  });



