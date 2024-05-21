const SizeModel = require("../../Models/SizeModel");
const applyPagination = require("../../utils/dataUtils");

const getAllSizes = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const searchQuery = req.query.q || "";

        let filter = {};
        if (searchQuery) {
            filter = {
                size: { $regex: searchQuery, $options: 'i' }
            };
        }

        const sizes = await SizeModel.find(filter).sort({ createdAt: -1 });
        const paginatedData = applyPagination(sizes, page)
        return res.status(200).json({
            status: true,
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

const addSize = async (req, res) => {
    try {
        const { size } = req.body;
        const newSize = new SizeModel({
            size
        });
        await newSize.save();
        return res.status(201).json({
            status: true,
            message: "Size added successfully",
        });
    } catch (error) {
        console.error("Error adding size:", error);
        return res.status(500).send({
            status: false,
            message: "Error adding size"
        });
    }
};

const editSize = async (req, res) => {
    try {
        const { id } = req.params;
        const { size } = req.body;

        const updatedSize = await SizeModel.findByIdAndUpdate(id, { size });

        if (!updatedSize) {
            return res.status(404).json({
                status: false,
                message: "Size not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Size updated successfully",
            response: updatedSize
        });
    } catch (error) {
        console.error("Error updating size:", error);
        return res.status(500).send({
            status: false,
            message: "Error updating size"
        });
    }
};

const deleteSize = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSize = await SizeModel.findByIdAndDelete(id);

        if (!deletedSize) {
            return res.status(404).json({
                status: false,
                message: "Size not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Size deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting size:", error);
        return res.status(500).send({
            status: false,
            message: "Error deleting size"
        });
    }
};

const getOneSize = async (req, res) => {
    try {
        const { id } = req.params;

        const size = await SizeModel.findById(id);

        if (!size) {
            return res.status(404).json({
                status: false,
                message: "Size not found"
            });
        }

        return res.status(200).json({
            status: true,
            response: size
        });
    } catch (error) {
        console.error("Error fetching size:", error);
        return res.status(500).send({
            status: false,
            message: "Error fetching size"
        });
    }
};

module.exports = { getAllSizes, addSize, editSize, deleteSize, getOneSize };
