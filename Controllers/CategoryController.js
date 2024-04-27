const { validationResult } = require('express-validator');
const CategoryModel = require('../Models/CategoryModel');

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

module.exports = { addCategory };
