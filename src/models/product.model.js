const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;

//Define the products schema

const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required : true,
        unique: true
    },
    price : {
        type : String,
        required: true,
    },
    productDescription : {
        type : String,
        required: true,
    },
    stock : {
        type : String,
        required : true,
    },
    categoryId : {
        type : String,
        required : true,
    }
});


//Product model from the schema
const Product = mongoose.model("Product" , productSchema)
module.exports = Product;