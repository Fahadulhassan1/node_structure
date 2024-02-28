const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const mongooseConnection = require("./db/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Define your routes here
const routes = require("./routes/route");
app.use("/api", routes);
mongooseConnection();

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
