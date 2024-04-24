const express = require('express');
const Productmodel = require("../Models/Productmodel");
const cloudinary = require('../Utils/imageupload')

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
        console.log("dd",product)
        const imageUrl = await cloudinary.uploader.upload(image);
        console.log("imageUrl", imageUrl);
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

module.exports = { addproduct };
