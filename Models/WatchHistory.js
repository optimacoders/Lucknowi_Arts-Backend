const mongoose = require('mongoose')

const WatchHistorySchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const WatchHistory = mongoose.model("WatchHistory", WatchHistorySchema)

module.exports = WatchHistory;