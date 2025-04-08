const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");

// Auth0 Config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(auth(config));

// Apply Auth Middleware Conditionally
const authMiddleware = process.env.NODE_ENV === "test" ? (req, res, next) => next() : requiresAuth();

// Routes
app.use("/games", authMiddleware, require("./src/routes/games"));
app.use("/consoles", authMiddleware, require("./src/routes/consoles"));
app.use("/users", authMiddleware, require("./src/routes/users"));
app.use("/copies", authMiddleware, require("./src/routes/copies"));

// Swagger Docs
app.use("/api-docs", authMiddleware, require("swagger-ui-express").serve, require("swagger-ui-express").setup(require("./swagger.json")));

// Error Handling
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
});

// Connect to MongoDB (Only If Not in Test Mode)
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

// Export app for testing
module.exports = app;

// Start Server Only If Not in Test Mode
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}