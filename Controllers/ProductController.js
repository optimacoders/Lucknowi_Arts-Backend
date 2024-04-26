const express = require('express');
const Productmodel = require("../Models/Productmodel");
const cloudinary = require('../Utils/imageupload')

const addproduct = async (req, res) => {
    try { 
        console.log(req)
        const { title, description, quantity, original_price, selling_price, image, category, size, color, video, material } = req.body;
        console.log(title,image);
        const imageUrl = await cloudinary.uploader.upload(image);
        console.log("dd",product)
        console.log("imageUrl", imageUrl);
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

module.exports = { addproduct };
