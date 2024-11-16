import User from "../models/user.model.js";

//add to cart
const addToCart = async (req,res) => {
    try {
        const { userId } = req.body;
       const userData = await User.findById(userId);
        let cartData = userData.cartData || {};
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await User.findByIdAndUpdate(userData._id, { cartData });
        return res.status(201).json({success:true,message:"Item added to cart"});
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false,message:error.message})
    }
}

// remove Item from user cart
const removeFromCart = async (req,res) => {
    try {
       const { userId } = req.body;
       const userData = await User.findById(userId);
       const cartData = await userData.cartData;
       if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1;
       }
       await User.findByIdAndUpdate(userId,{cartData});
       return res.status(201).json({success:true,message:"Item removed from cart"});
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false,message:error.message})
    }
}

//fetch user cart
const getCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await User.findById(userId);
        const cartData = await userData.cartData;
        return res.status(201).json({success:true,cartData});
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false,message:error.message})
    }
}

export {
    addToCart,
    removeFromCart,
    getCart
}