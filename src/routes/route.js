const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");

// Define your routes
//users route
router.get("/users", userController.getUsers);
router.post("/users", userController.saveUser);
router.get("/users/:userName" , userController.getUserByName)
router.post("/users/update" , userController.updateUser)
router.delete("/users/:userName" , userController.deleteUser)
router.get("/dataByQueryParameters" , userController.getUserByQueryParameters)
//products route
router.get("/products" , productController.getProducts);
router.post("/products", productController.saveProducts);
router.get("/products/:productName" , productController.getProductByName);
router.get("/productByQueryParameters" , productController.getProductByQueryParameter)
router.post("/products/update" , productController.updateProducts);
router.delete("/products/:productName" , productController.deleteProducts);

// Add more routes as needed

module.exports = router;
