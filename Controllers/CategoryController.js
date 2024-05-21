const { validationResult } = require('express-validator');
const CategoryModel = require('../Models/CategoryModel');
const applyPagination = require('../utils/dataUtils');
const { response } = require('express');

const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, image } = req.body;
        const category = new CategoryModel({ name, image });
        await category.save();

        return res.status(201).send({
            status: true,
            message: "Category added successfully",
            category: category
        });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).send({
            status: false,
            message: "Error adding category"
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const searchQuery = req.query.q || "";

        let filter = {};
        if (searchQuery) {
            filter = {
                name: { $regex: searchQuery, $options: 'i' }
            };
        }

        const categories = await CategoryModel.find(filter).sort({ createdAt: -1 });

        const paginatedData = applyPagination(categories, page)
        return res.status(200).send({
            status: true,
            response: paginatedData
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).send({
            status: false,
            message: "Error fetching categories"
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await CategoryModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).send({
                status: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).send({
            status: false,
            message: "Error deleting category"
        });
    }
}


const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;

        const updateData = { name };
        if (image) {
            updateData.image = image;
        }

        const category = await CategoryModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!category) {
            return res.status(404).send({
                status: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Category updated successfully",
            category: category
        });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).send({
            status: false,
            message: "Error updating category"
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).send({
                status: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            status: true,
            response: category
        });
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).send({
            status: false,
            message: "Error fetching category"
        });
    }
}



module.exports = { addCategory, getAllCategories, deleteCategory, editCategory, getCategoryById };