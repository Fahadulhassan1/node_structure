const express = require("express");
const cors = require("cors");
const mongooseConnection = require("./db/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// // Define your routes here
const routes = require("./routes/route");
app.use("/api", routes);
mongooseConnection();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
