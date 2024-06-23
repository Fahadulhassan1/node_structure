//import the required models
const { log, error } = require("winston");
const Product = require("../models/product.model")
var ObjectId = require('mongodb').ObjectId;

//Define your service methods
exports.getProducts = async (productName, price, productDescription, stock) => {
    if(productName && price && productDescription && stock){
        const product = await Product.find({
            productName : productName,
            price : price,
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(productName && !price && !productDescription && !stock){
        const product = await Product.find({
            productName : productName,
        })
        return product;
    }else if(productName && price && !productDescription && !stock){
        const product = await Product.find({
            productName : productName,
            price : price,
        })
        return product;
    }else if(productName && price && productDescription && !stock){
        const product = await Product.find({
            productName : productName,
            price : price,
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && price && !productDescription && !stock){
        const product = await Product.find({
            price : price,
        })
        return product;
    }else if(!productName && price && productDescription && !stock){
        const product = await Product.find({
            price : price,
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && price && productDescription && stock){
        const product = await Product.find({
            price : price,
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(!productName && price && !productDescription && stock){
        const product = await Product.find({
            price : price,
            stock : stock,
        })
        return product;
    }else if(!productName && !price && productDescription && !stock){
        const product = await Product.find({
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && !price && productDescription && stock){
        const product = await Product.find({
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(!productName && !price && !productDescription && stock){
        const product = await Product.find({
            stock : stock,
        })
        return product;
    }else if(productName && !price && !productDescription && stock){
        const product = await Product.find({
            productName : productName,
            stock : stock,
        })
        return product;
    }else if(!productName && !price && !productDescription && !stock){
        const product = await Product.find()
        return product;
    }
}

exports.getProductByName = async(productName) => {
    const product = await Product.findOne({productName : productName});
    return product;
}

exports.getProductByQueryParameter = async (productName, price, productDescription, stock) => {
    if(productName && price && productDescription && stock){
        const product = await Product.findOne({
            productName : productName,
            price : price,
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(productName && !price && !productDescription && !stock){
        const product = await Product.findOne({
            productName : productName,
        })
        return product;
    }else if(productName && price && !productDescription && !stock){
        const product = await Product.findOne({
            productName : productName,
            price : price,
        })
        return product;
    }else if(productName && price && productDescription && !stock){
        const product = await Product.findOne({
            productName : productName,
            price : price,
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && price && !productDescription && !stock){
        const product = await Product.findOne({
            price : price,
        })
        return product;
    }else if(!productName && price && productDescription && !stock){
        const product = await Product.findOne({
            price : price,
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && price && productDescription && stock){
        const product = await Product.findOne({
            price : price,
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(!productName && price && !productDescription && stock){
        const product = await Product.findOne({
            price : price,
            stock : stock,
        })
        return product;
    }else if(!productName && !price && productDescription && !stock){
        const product = await Product.findOne({
            productDescription : productDescription,
        })
        return product;
    }else if(!productName && !price && productDescription && stock){
        const product = await Product.findOne({
            productDescription : productDescription,
            stock : stock,
        })
        return product;
    }else if(!productName && !price && !productDescription && stock){
        const product = await Product.findOne({
            stock : stock,
        })
        return product;
    }
}

exports.saveProducts = async (productName , price, productDescription , stock, categoryId) => 
    {
        const newProduct = new Product ({
            productName : productName,
            price : price,
            productDescription : productDescription,
            stock : stock,
            categoryId: categoryId,
    });
    return await newProduct.save();
};

exports.getProductById = async (productId) => {
    try {
        const product = await Product.findOne({_id : ObjectId(productId)})
        if(!product){
            throw({error : "Product not found."})
        }
        return product;
    } catch (error) {
        return error;
    }
}

//update products APIs

exports.updateProducts = async (productId, productName, price , productDescription, stock, categoryId) => {
    try {
        const product = await this.getProductById(productId);
        if (!product){
            throw({error : "Product not found."})
        }

        const updatedProducts = await Product.findByIdAndUpdate({ 
            _id : ObjectId(productId),
            productName : productName, 
            price : price , 
            productDescription : productDescription , 
            stock : stock,
            categoryId : categoryId
        })
        return updatedProducts;
    } catch (error){
        return error;
    }
}

exports.deleteProduct = async (productName) => {
    try {const product = await this.getProductByName(productName);
        if (!product){
            throw({error : "Product not found."})
        }

        const deletedProducts = await Product.findOneAndDelete({ 
            productName : productName 
        })
        return deletedProducts;
    }catch (error){
        return error;
    }

}

exports.totalProducts = async () => {
    try {
        const products = await Product.count();
        return products;
    } catch (error) {
        return error;
    }
}