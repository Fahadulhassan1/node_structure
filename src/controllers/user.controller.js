// Import any required services or models here
const User = require("../models/user.model");
const userService = require("../services/user.service");
const middleware = require("../middlewares/middleware")

// Define your controller methods

//get data of all the users in db

exports.getUsers = async (req, res) => {
  try {
    const {userName , email , password} = req.query;

    const users = await userService.getUsers(userName, email, password);
    if(!users){
      return res.status(400).json({error : "User not found."})
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}; 


//API for user Sign Up

exports.saveUser = async (req, res) => {
  try {
//Get all data
    const {userName, email, password} = req.body
    if(!userName){
      return res.status(400).json({error: "Username not provided."})
    }
    else if(!email){
      return res.status(400).json({error: "Email not provided."})
    }
    else if(!password){
      return res.status(400).json({error: "Password not provided."})
    }
//Check if user already exist
    const existingUser = await User.findOne({email})
    if(existingUser){
      res.status(400).json({error: "User already exists with this email."})
    }
//Save the user in Db
    const user = await userService.saveUsers(userName, email, password);

    const token = await middleware.getToken(user);

    res.status(200).json({token : token , user : user});
  } 
  catch (error) {
    res.status(500).json({ error: error });
    }
};


//API for user Sign In

exports.userSignIn = async (req, res) => {
  try {
    const {email , password} = req.query;
    if(!(email && password)){
      return res.status(400).json({error : "Email or password not provided."})
    }

    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({error : "User not found."})
    }
    //match the password
    if(user.password === password){
      const token = await middleware.getToken(user);
      return res.status(200).json({token : token , user : user})
    }else
    return res.status(400).json({error : "Password incorrect."})
  } catch (error) {
    res.status(500).json({error : error})
  }
}


//API to get user by name

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


//API to get user by query parameters

exports.getUserByQueryParameters = async (req , res) => {
  try {
    const {userName, email, password} = req.query;

    const user = await userService.getUserByQueryParameters(userName , email , password)
    if(!user){
      return res.status(400).json({error : "User not found."})
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error : error})
  }
}


//API to get user by ID

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if(!userId){
      return res.status(400).json({error : "User ID not provided."})
    }
    const user = await userService.getUserById(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error:error})
  }
}


//API to update user

exports.updateUser = async (req, res) => {
  try {
    const {userName, email, password} = req.body;
    if(!userName){
      res.status(400).json({error : "Username not provided."})
    }else if(!email){
      res.status(400).json({error : "Email not provided."})
    }else if(!password){
      res.status(400).json({error : "Password not provided."})
    }

    await userService.updateUser(userName , email , password)
    res.status(200).json({message : "1 user updated successfully"});
  } catch (error) {
    res.status(500).json({error : error})
  }
}


//API to update user status by id

exports.updateUserStatusById = async(req, res) => {
  try {
    const {userId, isBlocked} = req.params;
    if(!userId){
      return res.status(400).json({error: "User not provided."})
    }
    await userService.updateUserStatusById(userId, isBlocked)
    return res.status(200).json({message : "Status updated"})
  } catch (error) {
    res.status(500).json({error:error})
  }
}


//API to get total number of users in DB

exports.totalUsers = async (req, res) => {
  try {
    const users = await userService.totalUsers()
    return res.status(200).json({TotalUsers : users})
  } catch (error) {
      res.status(500).json({error : error})
  }
}


//API to delete single user

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


//API to delete all the users in db

exports.deleteAll = async (req, res) => {
  try {
    const userName = req.params.userName;
    if(!userName){
      res.status(400).json({error : "Username not provided."})
    }
    await userService.deleteAll(userName)
    res.status(200).json({message : "All the users deleted Succesfully!"})
  } catch (error) {
    res.status(500).json({error : error})
  }
}