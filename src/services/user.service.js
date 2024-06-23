// Import any required models here
const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const { log } = require("winston");

var ObjectId = require('mongodb').ObjectId;

// Define your service methods

//APIs to Get all the users from db

exports.getUsers = async (userName, email, password) => {
  if(!(userName && email && password)){
    const user = await User.find();
    return user;
  }
  else if(userName && email && password){
    const user = await User.find({
      username : userName,
      email : email,
      password : password
    })
    return user;
  }else if(userName && email && !password){
    const user = await User.find({
      username : userName,
      email : email
    })
    return user;
  }else if(userName && !(email && password)){
    const user = await User.find({
      username : userName
    })
    return user;
  }else if(userName && !email && password){
    const user = await User.find({
      username : userName,
      password : password
    })
    return user;
  }else if(!userName && email && !password){
    const user = await User.find({
      email : email
    })
    return user;
  }else if (!userName && !email && password){
    const user = await User.find({
      password : password
    })
    return user;
  }else if (!userName && email && password){
    const user = await User.find({
      email : email,
      password : password
    })
    return user;
  }
};


//API to find user by name from db

exports.getUserByName = async (userName) => {
    const user = await User.findOne({username : userName})
    return user;   
}


//API to find user by query parameter from db

exports.getUserByQueryParameters = async (userName , email , password) => {
  if(userName && email && password){
    const user = await User.findOne({
      username : userName,
      email : email,
      password : password
    })
    return user;
  }else if(userName && email && !password){
    const user = await User.findOne({
      username : userName,
      email : email
    })
    return user;
  }else if(userName && !email && !password){
    const user = await User.findOne({
      username : userName
    })
    return user;
  }else if(userName && !email && password){
    const user = await User.findOne({
      username : userName,
      password : password
    })
    return user;
  }else if(!userName && email && !password){
    const user = await User.findOne({
      email : email
    })
    return user;
  }else if (!userName && !email && password){
    const user = await User.findOne({
      password : password
    })
    return user;
  }else if (!userName && email && password){
    const user = await User.findOne({
      email : email,
      password : password
    })
    return user;
  }
}


//API to find user by id

exports.getUserById = async (userId) => {
  try {        
    const user = await User.findOne({_id : ObjectId(userId)})
    return user;  
  } catch (error) {
    return error;
  }
}


//Save user /Sign Up

exports.saveUsers = async (userName, email, password) => {
  const newUser = new User({
    username: userName,
    email: email,
    password: password,
  });

  return await newUser.save();
};


//Api for update user

exports.updateUser = async (userName , email, password) => {
  try {
    const user = await this.getUserByName(userName)
    if(!user){
      throw({error : "User not found."})
    }

    const updatedUser = await User.findOneAndUpdate({
      username :userName,
      email : email , 
      password : password
    })
   return updatedUser;
  } catch (error) {
    return error;
  }
}


//API to update user status by id

exports.updateUserStatusById = async (userId , isBlocked) => {
  try {
    const user = await this.getUserById(userId)
    if(!user){
      throw({error: "User not found."})
    }
    await User.findOneAndUpdate({
      _id : ObjectId(userId),  
      isBlocked : isBlocked,
    })
    const updatedUser = await this.getUserById(userId)
    return updatedUser;
  } catch (error) {
    return error;
  }
}

//API for delete user

exports.deleteUser = async (userName) => {
  try {
    const user = await this.getUserByName(userName)
    if(!user){
      throw({error : "UserName not found."})
    }
    return await User.findOneAndDelete({username : userName});
  } catch (error) {
    return error;
  }
}


//API to delete all the users in database

exports.deleteAll = async (userName) => {
  try {
    const user = await this.getUserByName(userName)
    if(!user){
      throw({error : "UserName not found."})
    }
    return await User.deleteMany({username : userName})
  } catch (error) {
    return error;
  }
}


//API to get number of users in db

exports.totalUsers = async () => {
  try {
    const users = await User.count()
    return users;
  } catch (error) {
    return error;
  }
}
