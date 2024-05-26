const express = require('express');
const Productmodel = require("../Models/Productmodel");
const applyPagination = require("../utils/dataUtils")

const addproduct = async (req, res) => {
    try {
        const { title, description, quantity, original_price, selling_price, image, category, size, color, video, material } = req.body;
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
            material
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
        let products;
        if (req.query.category !== undefined) {
            let category = req.query.category;
            products = await Productmodel.find({ category: category }).sort({ createdAt: -1 }).populate('category');
        } else {
            products = await Productmodel.find({}).sort({ createdAt: -1 }).populate('category');
        }
        console.log(products)
        const paginatedData = applyPagination(products, page)
        return res.status(200).json({
            status: true,
            message: "Products fetched ",
            products: paginatedData
        });


    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching products"
        });
    }
}


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


module.exports = { addproduct, getProducts, getProductById };
