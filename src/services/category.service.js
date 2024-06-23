// Import any required models here
const mongoose = require("mongoose");
const Category = require("../models/category.model");
var ObjectId = require('mongodb').ObjectId;

//Define your service methods

exports.getCategories = async () => {
    try {
        const category = await Category.find()
        if(!category){
            throw({error : "Category not found."})
        }
        return category;
    } catch (error) {
        return error;
    }
}

exports.getCategoryByName = async (categoryName) => {
    try {
        const category = await Category.findOne({categoryName : categoryName})
        if(!category){
            throw({error : "Category not found."})
        }
        return category;
    } catch (error) {
        return error;
    }
}

exports.saveCategory = async (categoryName, categoryDescription) =>
    {
        const category = new Category ({
            categoryName : categoryName,
            categoryDescription : categoryDescription
        });
        return await category.save();
}

exports.totalCategory = async () => {
    const total = await Category.count()
    return total;
}

exports.updateCategory = async (categoryName, categoryDescription) => {
    try {
        const category = await this.getCategoryByName(categoryName);
        if(!category){
            throw({error : "Category not found."})
        }
        const updatedCategory = await Category.findOneAndUpdate(
            {
            categoryName: categoryName,
            categoryDescription : categoryDescription,
        })
        return updatedCategory;
    } catch (error) {
        return error;
    }
}

exports.deletecategory = async (categoryName) => {
    try {
        const category = await this.getCategoryByName(categoryName);
        if(!category){
            throw({error: "Category not found."});
        }
        return await Category.findOneAndDelete(categoryName);
    } catch (error) {
        return error;
    }
}