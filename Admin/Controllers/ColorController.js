const ColorModal = require("../../Models/ColorsModel");
const applyPagination = require("../../utils/dataUtils");

const getAllColors = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const searchQuery = req.query.q || "";

        let filter = {};
        if (searchQuery) {
            filter = {
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { colorCode: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }

        const color = await ColorModal.find(filter).sort({ createdAt: -1 });
        const paginatedData = applyPagination(color, page)
        return res.status(200).json({
            status: true,
            message: "Data fetched successfully.",
            response: paginatedData
        });

    } catch (error) {
        console.error("Error fetching sizes:", error);
        return res.status(500).send({
            status: false,
            message: "Error fetching sizes"
        });
    }
};

const addColor = async (req, res) => {
    try {
        const { name, colorCode } = req.body;
        const newColor = new ColorModal({
            name,
            colorCode
        });
        await newColor.save();
        return res.status(201).json({
            status: true,
            message: "Color added successfully",
        });
    } catch (error) {
        console.error("Error adding size:", error);
        return res.status(500).send({
            status: false,
            message: "Error adding size"
        });
    }
};

const editColor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, colorCode } = req.body;

        const updatedColor = await ColorModal.findByIdAndUpdate(id, { name, colorCode });

        if (!updatedColor) {
            return res.status(404).json({
                status: false,
                message: "Color not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Color updated successfully",
            response: updatedColor
        });
    } catch (error) {
        console.error("Error updating size:", error);
        return res.status(500).send({
            status: false,
            message: "Error updating size"
        });
    }
};

const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedColor = await ColorModal.findByIdAndDelete(id);

        if (!deletedColor) {
            return res.status(404).json({
                status: false,
                message: "Color not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Color deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting size:", error);
        return res.status(500).send({
            status: false,
            message: "Error deleting size"
        });
    }
};

const getOneColor = async (req, res) => {
    try {
        const { id } = req.params;

        const color = await ColorModal.findById(id);

        if (!color) {
            return res.status(404).json({
                status: false,
                message: "Color not found"
            });
        }

        return res.status(200).json({
            status: true,
            response: color
        });
    } catch (error) {
        console.error("Error fetching size:", error);
        return res.status(500).send({
            status: false,
            message: "Error fetching size"
        });
    }
};

module.exports = { getAllColors, getOneColor, addColor, editColor, deleteColor }