// Import any required models here
const User = require("../models/user.model");

// Define your service methods
exports.getUsers = async (userName, email, password) => {
  if(!userName && !email && !password){
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
  }else if(userName && !email && !password){
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

exports.saveUsers = async (userName, email, password) => {
  //   const example = new Example({ name });
  const newUser = new User({
    username: userName,
    email: email,
    password: password,
  });
  return await newUser.save();
};


exports.getUserByName = async (userName) => {
    const user = await User.findOne({username : userName})
    return user;   
}

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

exports.updateUser = async (userName , email, password) => {
  try {
    const user = await this.getUserByName(userName)
    if(!userName){
      throw({error : "User not found."})
    }

    const updatedUser = await User.findOneAndUpdate({
      userName :userName,
      email : email , 
      password : password
    })
   return updatedUser;
  } catch (error) {
    return error;
  }
}

exports.deleteUser = async (userName) => {
  try {
    const userName = await this.getUserByName(userName)
    if(!userName){
      throw({error : "UserName not found."})
    }
    return await User.findOneAndDelete({userName : userName});
  } catch (error) {
    return error;
  }
}
