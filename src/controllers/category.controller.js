// Import any required services or models here
const categoryService = require("../services/category.service");

//Define your controller method

exports.getCategories = async (req, res) => {
    try {
        const category = await categoryService.getCategories()
        if(!category){
            res.status(400).json({error : "Category not found."})
        }
        return res.status(200).json(category);
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.getCategoryByName = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        if(!categoryName){
            return res.status(400).json({error : "Category Name not provided."})
        }
        const category = await categoryService.getCategoryByName(categoryName)
        if(!category){
            res.status(400).json({error : "Category not found."})
        }
        return res.status(200).json(category);
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.saveCategory = async(req, res) => {
    try {
        const {categoryName, categoryDescription} = req.body;
        if(!(categoryName && categoryDescription)){
            return res.status(400).json({error: "Category name or description not provided."})
        }
        const category = await categoryService.saveCategory(categoryName, categoryDescription)
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.totalCategory = async(req, res) => {
    try {
        const total = await categoryService.totalCategory()
        if(!total){
            return res.status(400).json({error : "No categories available."})
        }
        res.status(200).json({Total : total});
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const {categoryName, categoryDescription} = req.body
        if(!(categoryName && categoryDescription)){
            return res.status(400).json({error : "Category Name or description not provided."})
        }
        const updatedCategory = await categoryService.updateCategory(categoryName, categoryDescription)
        return res.status(200).json({message: "1 category updated.", updatedCategory:updatedCategory});
    } catch (error) {
        res.status(500).json({error : error})
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        if(!categoryName){
            return res.status(400).json({error : "category name not provided."})
        }
        const deletedcategory = await categoryService.deletecategory(categoryName)
        res.status(200).json({message : "1 category deleted successfully!" , deletedCategory : deletedcategory})
    } catch (error) {
        res.status(500).json({error : error})
    }
}