const convert = require("../Middleware/CurrecyConvert");
const Usermodel = require("../Models/Usermodel");



const addtoCart = async (req, res) => {
    try {
        const { productId, quantity, color, size } = req.body;
        const userid = req.user._id
        console.log("dd", productId)
        const user = await Usermodel.findById(userid);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const existingProductIndex = user.cart.findIndex(item => item?.product?.toString() === productId);


        user.cart.push({ product: productId, quantity: quantity, color: color, size: size });


        await user.save();
        await user.populate('cart.product');

        return res.status(200).send({
            status: true,
            message: "Product added to cart",
            cart: user.cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};




const getUserCart = async (req, res) => {
    try {
        const { currency } = req.query;
        const userId = req.user._id
        const user = await Usermodel.findById(userId);
        console.log(user)
        await user.populate('cart.product');

        if (currency && currency !== "INR") {
            for (const item of user.cart) {
                console.log(item.product, 90909090);
                const convertedSellingPrice = await convert(item?.product?.selling_price, "INR", currency);
                if (convertedSellingPrice !== null) {
                    item.product.selling_price = Math.round(convertedSellingPrice * 100) / 100;
                }

                const convertedOriginalPrice = await convert(item?.product?.original_price, "INR", currency);
                if (convertedOriginalPrice !== null) {
                    item.product.original_price = Math.round(convertedOriginalPrice * 100) / 100;
                }

                const deliveryPrice = await convert("25", "USD", currency);
                item.product.delivery = Math.round(deliveryPrice * 100) / 100;
            }
        }



        return res.status(200).send({
            status: true,
            message: "Cart fetched successfully",
            cart: user.cart
        });
    } catch (error) {
        console.log(error, 9090909);
        return res.status(500).send({ error: 'Internal server error' });
    }
};


const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id
        const user = await Usermodel.findById(userId)

        const index = user.cart.findIndex(item => item.productId === productId);
        user.cart.splice(index, 1);
        await user.save();
        return res.status(200).send({
            status: true,
            message: "Product Removed successfully",

        });

    } catch (error) {

    }
}



const editCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body
        const userId = req.user._id
        const user = await Usermodel.findById(userId)

        const productIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (productIndex !== -1) {
            user.cart[productIndex].quantity = Number(quantity);
        } else {
            return res.status(404).send({ message: 'Product not found in cart' });
        }

        await user.save();

        return res.status(200).send({
            status: true,
            message: "Cart updated",
            cart: user.cart
        })
    } catch (error) {

    }
}



module.exports = { addtoCart, getUserCart, removeProduct, editCart }