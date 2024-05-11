const express = require('express');
const Productmodel = require("../Models/Productmodel");

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


const getProducts = async (req, res) => {
    try {
        let products;
        if (req.query.category !== undefined) {
            let category = req.query.category;
            products = await Productmodel.find({ category: category });
        } else {
            products = await Productmodel.find({});
        }
        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            products: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            status: false,
            message: "Error fetching products"
        });
    }
}


const getProductById=async(req,res)=>{
try {
    const{id}=req.params;
    const product=await Productmodel.findById(id);
    return res.status(200).json({
        status: true,
        message: "Product fetched successfully",
        products: product
    });
} catch (error) {
    
}
}

module.exports = { addproduct,getProducts ,getProductById};
