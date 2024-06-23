//Import any required services or models
const productService = require("../services/product.service")

//Define your controller method

exports.getProducts = async (req, res) => {
    try {
        const {productName, price, productDescription, stock, categoryId} = req.query;

        const products = await productService.getProducts(productName, price, productDescription, stock, categoryId)
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
        const {productName, price, productDescription, stock, categoryId}   = req.query;

        const product = await productService.getProductByQueryParameter(productName, price, productDescription, stock, categoryId)
        if(!product){
            return res.status(400).json({error : "Product not found."})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.getProductById = async (req, res) =>{
    try {
        const productId = req.params.productId;
        if(!productId){
            return res.status(400).json({error : "Product Id not provided."})
        }
        const product = await productService.getProductById(productId)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.saveProducts = async(req , res) => {
    try {
        const {productName, price, productDescription, stock, categoryId} = req.body;

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
        else if(!categoryId){
            return res.status(400).json({error: "categoryId not provided."})
        }

        const newProduct = await productService.saveProducts(productName , price, productDescription, stock, categoryId)
        res.status(200).json(newProduct);
    }
    catch (error) {
        res.status(500).json({error : error});
    };
};

exports.updateProducts = async (req , res) => {
    try {
        const {productId, productName, price, productDescription, stock, categoryId} = req.body;

        if(!productId){
            res.status(400).json({error: "Product ID not provided."})
        }
        else if(!productName){
            res.status(400).json({error: "Product Name not provided."})
        }
        else if(!price){
            res.status(400).json({error: "Product Price not provided." })
        }
        else if(!productDescription){
            res.status(400).json({error: "Product Description not provided." })
        }
        else if(!stock){
            res.status(400).json({error: "Product Stock not provided."})
        }
        else if(!categoryId){
            res.status(400).json({error: "Category Id not provided."})
        }
        const update = await productService.updateProducts(productId, productName , price, productDescription, stock, categoryId)
        res.status(200).json({message : "1 product updated successfully!!!" , update : update});
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

exports.totalProducts = async (req, res) => {
    try {
        const products = await productService.totalProducts()
        return res.status(200).json({TotalProducts : products});
    } catch (error) {
        res.status(500).json({error : error})
    }
}
