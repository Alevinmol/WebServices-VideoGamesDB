const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongoose").MongoClient;



// From env flie
const port = process.env.PORT || 8080;

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// local modules
const connectDB = require("./src/database/connnect");

// Express
const app = express();
app.use(bodyParser.json());


// Middleware

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./src/routes"));
app.use("/games", require("./src/routes/games"));
app.use(express.static("public"));

// Error handling
// 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
}
);
// global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
});



// local mongodb connection and server start

connectDB().then(() => {
    app.listen(port);
    console.log(`Server running on port ${port}`); 
  }
).catch((err) => {
    console.error(err);
    process.exit(1);
  }
);