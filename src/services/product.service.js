//import the required models
const { log, error } = require("winston");
const Product = require("../models/product.model")

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

exports.saveProducts = async (productName , price, productDescription , stock) => 
    {
        const newProduct = new Product ({
            productName : productName,
            price : price,
            productDescription : productDescription,
            stock : stock,
    });
    return await newProduct.save();
};

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

exports.updateProducts = async (productName, price , productDescription, stock) => {
    try {const product = await this.getProductByName(productName);
        if (!product){
            throw({error : "Product not found."})
        }

        const updatedProducts = await Product.findOneAndUpdate({ 
            productName : productName , 
            price : price , 
            productDescription : productDescription , 
            stock : stock
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