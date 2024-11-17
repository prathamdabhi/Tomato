import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from 'stripe';
import 'dotenv/config';


    let stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//place order from frontend

const placeOrder = async (req, res) => {
    const { address, userId, items, amount, frontendUrl } = req.body;
    
    // Default to a fallback URL if frontendUrl isn't provided (for development or testing purposes)
    const frontend_uri = frontendUrl || 'https://tomato-front-end-cdu4.onrender.com';

    try {
        // Create the order in your database
        const newOrder = new Order({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        });
        
        await newOrder.save();

        // Clear the user's cart after placing the order
        await User.findByIdAndUpdate(userId, { cartData: {} });

        // Create line items for Stripe checkout
        const line_Items = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80  // Convert price to cents
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_Items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20 * 100 * 80  // Delivery charge (convert to cents)
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_Items,
            mode: "payment",
            success_url: `${frontend_uri}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_uri}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return the session URL to the frontend
        return res.status(201).json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const verifyOrder = async (req,res) => {
    try {
        const { orderId,success } = req.body;
        if(success === "true"){
            await Order.findByIdAndUpdate(orderId,{payment:true})
            return res.status(201).json({success:true,message:"Payment Successfull"});
        }else{
            await Order.findByIdAndDelete(orderId);
            return res.status(401).json({success:false,message:"Payment Failed"});
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:error.message}); 
    }
}

//api for users orders
const usersOrders = async (req,res) => {
    try {
        const orders = await Order.find({userId:req.body.userId});
        return res.status(201).json({success:true,data:orders});
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:error.message});
    }
}

// List All the orders
const listOrders = async (req,res) => {
    try {
        const orders = await Order.find({});
        return res.status(201).json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:error.message});
    }
}

const changeOrderStatus = async (req,res) => {
    try {
        const { orderId,status} = req.body;
        const order = await Order.findByIdAndUpdate(orderId,{status});
        return res.status(201).json({success:true,message:"Status Updated"});
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:error.message});
    }
}

export {
placeOrder,
verifyOrder,
usersOrders,
listOrders,
changeOrderStatus
}
