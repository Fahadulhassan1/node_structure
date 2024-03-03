//Import any required services or models
const productService = require("../services/product.service")

//Define your controller method

exports.getProducts = async (req, res) => {
    try {
        const productName = req.query.productName;
        const price = req.query.price;
        const productDescription = req.query.productDescription;
        const stock = req.query.stock;

        const products = await productService.getProducts(productName, price, productDescription, stock)
        if(!products){
            return res.status(400).json({error : "Product not found."})
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.getProductByName = async(req, res) => {
    try {
        const productName = req.params.productName
        if(!productName){
            return res.status(400).json({error: "Please add product name."})
        }
        
        const product = await productService.getProductByName(productName)
        if(!product){
            return res.status(400).json({error : "Product not found"})
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({error : error})
    }
}

exports.getProductByQueryParameter = async (req, res) => {
    try {
        const productName = req.query.productName;
        const price = req.query.price;
        const productDescription = req.query.productDescription;
        const stock = req.query.stock;

        const product = await productService.getProductByQueryParameter(productName, price, productDescription, stock)
        if(!product){
            return res.status(400).json({error : "Product not found."})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.saveProducts = async(req , res) => {
    try {
        const productName = req.body.productName;
        const price = req.body.price;
        const productDescription = req.body.productDescription;
        const stock = req.body.stock

        if(!productName){
            return res.status(400).json({error: "Product Name not provided."})
        }
        else if(!price){
            return res.status(400).json({error: "Product Price not provided." })
        }
        else if(!productDescription){
            return res.status(400).json({error: "Product Description not provided." })
        }
        else if(!stock){
            return res.status(400).json({error: "Product Stock not provided."})
        }

        const newProduct = await productService.saveProducts(productName , price, productDescription, stock)
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(500).json({error : error});
    };
};

exports.updateProducts = async (req , res) => {
    try {
        const productName = req.body.productName
        const price = req.body.price
        const productDescription = req.body.productDescription
        const stock = req.body.stock

        if(!productName){
            return res.status(400).json({error: "Product Name not provided."})
        }
        else if(!price){
            return res.status(400).json({error: "Product Price not provided." })
        }
        else if(!productDescription){
            return res.status(400).json({error: "Product Description not provided." })
        }
        else if(!stock){
            return res.status(400).json({error: "Product Stock not provided."})
        }
        const updatedProducts = await productService.updateProducts(productName , price, productDescription, stock)
        res.status(200).json({message : "1 product updated successfully!!!"});
    }catch (error){
        res.status(500).json({error : error})
    }
} 

exports.getProductByName = async(req, res) => {
    try {
        const productName = req.params.productName
        if(!productName){
            return res.status(400).json({error: "Please add product name."})
        }
        
        const product = await productService.getProductByName(productName)
        if(!product){
            return res.status(400).json({error : "Product not found"})
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({error : error})
    }
}

exports.deleteProducts = async (req , res) => {
    try {
        const productName = req.params.productName;

        if(!productName){
            return res.status(400).json({error: "Product Name not provided."})
        }
        
        await productService.deleteProduct(productName)
        res.status(200).json({message : "1 product deleted successfully!!!"});
        
    }catch (error){
        res.status(500).json({error : error})
    }
} 
