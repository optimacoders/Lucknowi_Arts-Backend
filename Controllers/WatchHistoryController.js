const WatchHistoryModal = require("../Models/WatchHistory");

const addWatchHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const updatedRecord = await WatchHistoryModal.findOneAndUpdate(
            { user: userId, product: productId },
            { $set: { createdAt: new Date() } },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Watch history updated successfully',
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating watch history',
            error: error.message
        });
    }
};

const getUserWatchHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const latestRecords = await WatchHistoryModal.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(4);

        res.status(200).json({
            success: true,
            message: 'Latest watch history retrieved successfully',
            data: latestRecords
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving watch history',
            error: error.message
        });
    }
};

module.exports = { addWatchHistory, getUserWatchHistory };
