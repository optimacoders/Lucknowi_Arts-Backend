const WatchHistoryModal = require("../Models/WatchHistory");

const addWatchHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        console.log(productId, 80080);

        const existingWatchHistory = await WatchHistoryModal.findOne({ user: userId, productId: productId });
        console.log(existingWatchHistory);

        if (existingWatchHistory) {
            existingWatchHistory.createdAt = Date.now();
            await existingWatchHistory.save();
            return res.status(200).json({ status: true, msg: "Watch history updated successfully" });
        } else {
            const newWatchHistory = new WatchHistoryModal({
                user: userId,
                productId: productId,
            });
            await newWatchHistory.save();
            return res.status(201).json({ status: true, msg: "Watch history added successfully" });
        }

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

        let latestRecords = await WatchHistoryModal.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("productId")

        latestRecords = latestRecords.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.productId._id.toString() === item.productId._id.toString()
            ))
        ).slice(0, 4);

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
