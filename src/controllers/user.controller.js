// Import any required services or models here
const User = require("../models/user.model");
const userService = require("../services/user.service");

// Define your controller methods
exports.getUsers = async (req, res) => {
  try {
    const userName = req.query.userName;
    const email = req.query.email;
    const password = req.query.password;

    const users = await userService.getUsers(userName, email, password);
    if(!users){
      return res.status(400).json({error : "User not found."})
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}; 

exports.saveUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    if(!userName){
      return res.status(400).json({error: "Username not provided."})
    }
    else if(!email){
      return res.status(400).json({error: "Email not provided."})
    }
    else if(!password){
      return res.status(400).json({error: "Password not provided."})
    }

    const newUser = await userService.saveUsers(userName, email, password);
    res.json(newUser);
  } 
  catch (error) {
    res.status(500).json({ error: error });
    }
};

exports.getUserByName = async (req, res) => {
  try {
    const userName = req.params.userName;
    if(!userName){
      res.status(400).json({error : "Please add UserName"})
    }
    const user = await userService.getUserByName(userName)
    if(!user){
      return res.status(400).json({error : "User not found."})
    }
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({error : error})
  }
}

exports.getUserByQueryParameters = async (req , res) => {
  try {
    const userName = req.query.userName;
    const email = req.query.email;
    const password = req.query.password;
    // console.log(userName , email, password);
    const user = await userService.getUserByQueryParameters(userName , email , password)
    if(!user){
      return res.status(400).json({error : "User not found."})
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error : error})
  }
}

exports.updateUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password
    if(!userName){
      res.status(400).json({error : "Username not provided."})
    }
    else if(!email){
      res.status(400).json({error : "Email not provided."})
    }
    else if(!password){
      res.status(400).json({error : "Password not provided."})
    }

    await userService.updateUser(userName , email , password)
    res.status(200).json({message : "1 user updated successfully"});
  } catch (error) {
    res.status(500).json({error : error})
  }
}

exports.deleteUser = async (req , res) => {
  try {
    const userName = req.params.userName
    if(!userName){
      res.status(400).json({error : "Username not provided."})
    }
    await userService.deleteUser(userName)
    res.status(200).json({message : "1 user deleted successfully!"})
  } catch (error) {
    res.status(500).json({error : error})
  }
}