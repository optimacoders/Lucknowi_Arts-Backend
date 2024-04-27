const mongoose = require("mongoose");

const FavouritesSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FavouritesModel = mongoose.model("Favourites", FavouritesSchema);

module.exports = FavouritesModel;