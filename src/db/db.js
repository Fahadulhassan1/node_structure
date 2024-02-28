var mongoose = require("mongoose");
require("dotenv").config();
dbUrl = process.env.MONGODB_URI;
function mongooseConnection() {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      dbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));
}
module.exports = mongooseConnection;
