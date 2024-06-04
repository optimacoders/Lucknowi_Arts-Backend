const FavouritesModel = require("../Models/FavouritesModel");
const applyPagination = require("../utils/dataUtils");

const addFavouriates =async(req,res)=>{
  try {
    console.log("sdsd")
    const user=req.user._id
    const {productId}=req.body;
    const favoriates =new FavouritesModel({product:productId,user:user})
    await favoriates.save();
    res.status(201).json({ status: true, message: 'Favoriates added successfully',favoriates });

  } catch (error) {
    
  }
}


const getuserFavouriates=async(req,res)=>{
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const favourites = await FavouritesModel.find({ user: userId }).populate("product user");
    const paginatedData = applyPagination(favourites, page);
    res.status(200).json({ status: true, message: 'Favoriates fetched successfully',favourites:paginatedData });
  } catch (error) {
    
  }
}

const removeuserFavouriates=async(req,res)=>{
  try {
    const userId = req.user._id;
    const productId = req.body.productId; 
    const favorite = await FavouritesModel.findOneAndDelete({ user: userId, product: productId });
    res.status(200).json({ status: true, message: 'Favoriates removed successfully',favorite });
  } catch (error) {
    
  }
}


module.exports={addFavouriates,getuserFavouriates,removeuserFavouriates}