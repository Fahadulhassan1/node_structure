const mongoose = require("mongoose");
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type : Boolean,
    default: false,
  }
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);
module.exports = User;
