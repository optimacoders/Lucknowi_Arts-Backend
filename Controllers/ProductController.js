const express = require('express');
const Productmodel = require("../Models/Productmodel");
const applyPagination = require("../utils/dataUtils");
const convert = require('../Middleware/CurrecyConvert');

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

        const { currency } = req.params;

        let filter = {};
        if (category === undefined || category === null || category === "") {
           filter={}
        }

        
        if (colour === undefined || colour === null || colour === "") {
            colour = null;
        }


        if (searchQuery) {
            filter.title = { $regex: searchQuery, $options: 'i' };
        }

        if (category !== null) {
            filter.category = category;
        }

        if (colour !== null && colour !== "") {
            filter["color.name"] = colour;
        }

        const products = await Productmodel.find(filter).sort({ createdAt: -1 }).populate('category');

        if (currency !== "INR") {
            for (const product of products) {
                const convertedSellingPrice = await convert(product.selling_price, "INR", currency);
                product.selling_price = Math.round(convertedSellingPrice * 100) / 100;

                const convertedOriginalPrice = await convert(product.original_price, "INR", currency);
                product.original_price = Math.round(convertedOriginalPrice * 100) / 100;
            }
        }

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
        const { id, currency } = req.params;
        const product = await Productmodel.findById(id);

        if (currency !== "INR") {
            const convertedSellingPrice = await convert(product?.selling_price, "INR", currency);
            product.selling_price = Math.round(convertedSellingPrice * 100) / 100;

            const convertedIOriginalPrice = await convert(product?.original_price, "INR", currency);
            product.original_price = Math.round(convertedIOriginalPrice * 100) / 100;
        }

        return res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            products: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Error fetching products"
        });
    }
}

const getSimilarProducts = async (req, res) => {
    try {
        const { category } = req.params;
        // console.log(categoryid);
        // console.log(category, 909090);
        const products = await Productmodel.find({ category: category }).sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Similar products fetched successfully",

        });
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching similar products",
            error: error.message
        });
    }
};


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


const latestProducts = async (req, res) => {
    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 }).limit(4);
        return res.status(200).json({
            status: true,
            message: "latestProducts fetched",
            latestproducts: products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error searching products',
            error: error.message
        });
    }
}


module.exports = { latestProducts, addproduct, getProducts, getProductById, getSimilarProducts, editProduct, deleteProduct, searchProduct };

