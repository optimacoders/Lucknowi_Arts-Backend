const express = require('express');
const Productmodel = require("../Models/Productmodel");
const applyPagination = require("../utils/dataUtils")

const addproduct = async (req, res) => {
    try {
        const { title, description, quantity, original_price, selling_price, image, category, size, color, video, material, howToWash } = req.body;
        const product = new Productmodel({
            title,
            description,
            quantity,
            original_price,
            selling_price,
            image,
            category,
            size,
            color,
            video,
            material,
            howToWash
        });

        await product.save();
        return res.status(201).send({
            status: true,
            message: "Product added successfully",
            product
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).send({
            status: false,
            message: "Error adding product"
        });
    }
}


const getProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const searchQuery = req.query.q || "";
        const category = req.query.category;

        let filter = {};

        if (searchQuery) {
            filter.title = { $regex: searchQuery, $options: 'i' };
        }

        if (category !== undefined) {
            filter.category = category;
        }

        const products = await Productmodel.find(filter).sort({ createdAt: -1 }).populate('category');

        const paginatedData = applyPagination(products, page, limit = 16);
        return res.status(200).json({
            status: true,
            message: "Products fetched",
            products: paginatedData
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching products"
        });
    }
};



const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Productmodel.findById(id);
        return res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            products: product
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching products"
        });
    }
}

const getSimilarProducts = async (req, res) => {
    try {
        const categoryid = req.params.category;
        const products = await Productmodel.find({ category: categoryid });
        return res.status(200).json({
            status: true,
            message: "Similar products fetched successfully",
            products
        });

    } catch (error) {

    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, quantity, original_price, selling_price, image, category, size, color, video, material, howToWash } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (quantity) updateData.quantity = quantity;
        if (original_price) updateData.original_price = original_price;
        if (selling_price) updateData.selling_price = selling_price;
        if (image) updateData.image = image;
        if (category) updateData.category = category;
        if (size) updateData.size = size;
        if (color) updateData.color = color;
        if (video) updateData.video = video;
        if (material) updateData.material = material;
        if (howToWash) updateData.howToWash = howToWash;

        const product = await Productmodel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).send({
                status: false,
                message: "Product not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).send({
            status: false,
            message: "Error updating product"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Productmodel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({
                status: false,
                message: "Product not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).send({
            status: false,
            message: "Error deleting product"
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const search = req.query.q || "";
        const filter = {};

        if (search) {
            filter.title = { $regex: ".*" + search + ".*", $options: "i" };
        }

        const products = await Productmodel.find(filter);

        console.log(products);
        return res.status(200).send({
            success: true,
            message: 'Products searched successfully',
            products
        });

    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(500).send({
            success: false,
            message: 'Error searching products',
            error: error.message
        });
    }
};



module.exports = { addproduct, getProducts, getProductById, getSimilarProducts, editProduct, deleteProduct, searchProduct };

