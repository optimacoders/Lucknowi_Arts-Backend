const mongoose = require("mongoose");

const FavouritesSchema = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FavouritesModel = mongoose.model("Favourites", FavouritesSchema);

module.exports = FavouritesModel;