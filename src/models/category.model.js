const mongoose = require("mongoose");

//Define the products schema

const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
    },
    categoryDescription : {
        type : String,
        required : true,
    }
});

const Category = mongoose.model("Category" , categorySchema)
module.exports = Category;