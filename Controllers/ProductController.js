const express = require('express');
const Productmodel = require("../Models/Productmodel");
const applyPagination = require("../utils/dataUtils");
const convert = require('../Middleware/CurrecyConvert');
const mongoose = require("mongoose");

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
        const color = req.query.colour || "";
        const currency = req.query.currency;
        const priceFrom = parseFloat(req.query.priceFrom);
        const priceTo = parseFloat(req.query.priceTo);
        const sort = req.query.sort || "createdAt";

        let filter = {};

        if (category && category !== 'null' && mongoose.Types.ObjectId.isValid(category)) {
            filter.category = new mongoose.Types.ObjectId(category);
        }

        if (searchQuery) {
            filter.title = { $regex: searchQuery, $options: 'i' };
        }

        if (color && color.trim() !== "" && color !== 'null') {
            filter["color.name"] = color;
        }

        if (!isNaN(priceFrom) && !isNaN(priceTo)) {
            filter.selling_price = { $gte: priceFrom, $lte: priceTo };
        } else if (!isNaN(priceFrom)) {
            filter.selling_price = { $gte: priceFrom };
        } else if (!isNaN(priceTo)) {
            filter.selling_price = { $lte: priceTo };
        }

        let sortOption = {};
        if (sort === "price_low_to_high") {
            sortOption = { selling_price: 1 };
        } else if (sort === "price_high_to_low") {
            sortOption = { selling_price: -1 };
        } else if (sort === "a_to_z") {
            sortOption = { title: 1 };
        } else {
            sortOption = { createdAt: -1 };
        }

        const products = await Productmodel.find(filter).sort(sortOption).populate('category');

        if (currency && currency !== "INR") {
            for (const product of products) {
                const convertedSellingPrice = await convert(product.selling_price, "INR", currency);
                if (convertedSellingPrice !== null) {
                    product.selling_price = Math.round(convertedSellingPrice * 100) / 100;
                }

                const convertedOriginalPrice = await convert(product.original_price, "INR", currency);
                if (convertedOriginalPrice !== null) {
                    product.original_price = Math.round(convertedOriginalPrice * 100) / 100;
                }
            }
        }

        const paginatedData = applyPagination(products, page, 12);
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

            const deliveryPrice = await convert("25", "USD", currency);
            product.delivery = Math.round(deliveryPrice * 100) / 100;
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
        const { category, productId, currency } = req.query;
        const page = req.query.page || 1;
        let filter = {};

        if (category && category !== 'null' && mongoose.Types.ObjectId.isValid(category)) {
            filter.category = new mongoose.Types.ObjectId(category);
        }

        if (productId && mongoose.Types.ObjectId.isValid(productId)) {
            filter._id = { $ne: new mongoose.Types.ObjectId(productId) };
        }

        const products = await Productmodel.find(filter).sort({ createdAt: -1 });

        if (currency && currency !== "INR") {
            for (const item of products) {
                console.log(item, 90909090);
                const convertedSellingPrice = await convert(item?.selling_price, "INR", currency);
                if (convertedSellingPrice !== null) {
                    item.selling_price = Math.round(convertedSellingPrice * 100) / 100;
                }

                const convertedOriginalPrice = await convert(item?.original_price, "INR", currency);
                if (convertedOriginalPrice !== null) {
                    item.original_price = Math.round(convertedOriginalPrice * 100) / 100;
                }
            }
        }

        const paginatedData = applyPagination(products, page);

        return res.status(200).json({
            status: true,
            message: "Similar products fetched successfully",
            products: paginatedData
        });
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching similar products",
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
    console.log("hbbuyhb");
    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 }).limit(4);
        return res.status(200).json({
            status: true,
            message: "latest Products fetched",
            latestproducts: products
        });
    } catch (error) {
        console.log(error, 900909);
        return res.status(500).send({
            success: false,
            message: 'Error searching products hvygvy',
            error: error.message
        });
    }
}


module.exports = { latestProducts, addproduct, getProducts, getProductById, getSimilarProducts, editProduct, deleteProduct, searchProduct };

