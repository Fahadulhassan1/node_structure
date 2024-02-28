// Import any required models here
const User = require("../models/user.model");

// Define your service methods
exports.getUsers = async () => {
  return await User.find();
};

exports.saveUsers = async (userName, email, password) => {
  //   const example = new Example({ name });
  const newUser = new User({
    username: userName,
    email: email,
    password: password,
  });
  console.log(newUser);
  return await newUser.save();
};
