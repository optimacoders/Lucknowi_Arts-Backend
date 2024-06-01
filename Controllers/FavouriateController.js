const FavouritesModel = require("../Models/FavouritesModel")

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
    const favourites = await FavouritesModel.find({ user: userId }).populate("product user");
    
    console.log(favourites)
    res.status(200).json({ status: true, message: 'Favoriates fetched successfully',favourites });
  } catch (error) {
    
  }
}


module.exports={addFavouriates,getuserFavouriates}