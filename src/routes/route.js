const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");
const categoryController = require("../controllers/category.controller")
const { authenticateToken } = require("../middlewares/middleware");

// Define your routes
//users route
router.get("/users",authenticateToken, userController.getUsers);
router.get("/users/:userName" ,authenticateToken, userController.getUserByName)
router.get("/users/userById/:userId" ,authenticateToken, userController.getUserById)
router.get("/dataByQueryParameters" ,authenticateToken, userController.getUserByQueryParameters)
router.get("/totalUsers" ,authenticateToken, userController.totalUsers)
router.get("/user/signIn" ,userController.userSignIn)

router.delete("/users/:userName" ,authenticateToken, userController.deleteUser)
router.delete("/users/deleteAll/:userName" ,authenticateToken, userController.deleteAll)

router.post("/user/signUp" , userController.saveUser);
router.post("/users/update" , userController.updateUser)

router.put("/users/updateUserStatusById/:userId/:isBlocked" , userController.updateUserStatusById)

//products route
router.get("/products" , productController.getProducts);
router.get("/products/:productName" , productController.getProductByName);
router.get("/productByQueryParameters" , productController.getProductByQueryParameter)
router.get("/products/productById/:productId" , productController.getProductById)
router.get("/totalProducts" , productController.totalProducts)

router.post("/products", productController.saveProducts);
router.post("/products/update" , productController.updateProducts);

router.delete("/products/:productName" , productController.deleteProducts);

//category route
router.get("/categories", categoryController.getCategories)
router.get("/category/getCategorybyName/:categoryName", categoryController.getCategoryByName)
router.get("/totalCategories" , categoryController.totalCategory)
router.delete("/delete/:categoryName" , categoryController.deleteCategory)
router.post("/category/updateCategory" , categoryController.updateCategory)
router.post("/category/savecategory" , categoryController.saveCategory)


// Add more routes as needed

module.exports = router;
