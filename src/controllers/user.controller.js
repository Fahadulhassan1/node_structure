// Import any required services or models here
const userService = require("../services/user.service");

// Define your controller methods
exports.getUsers = async (req, res) => {
  try {
    const examples = await userService.getUsers();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.saveUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;

    const password = req.body.password;
    console.log(userName);
    const newExample = await userService.saveUsers(userName, email, password);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
