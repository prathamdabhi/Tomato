import Food from "../models/foodModel.model.js";
import fs from 'fs';


const addFood = async (req, res) => {
let imageFile = `${req.file.filename}`;
const food = new Food({
name: req.body.name,
description:req.body.description,
price:req.body.price,
category:req.body.category,
image:imageFile
})
try {
    await food.save();
    res.status(201).json({ success:true,message:"food added successfully"});
} catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
}

}

//api to get all foodItems
const listFood = async (req,res) => {
    try {
        const food = await Food.find({});
        res.status(201).json({success:true,food});
    } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
    }
}

//api to remove foodItem
const removeFood = async (req,res) => {
    try {
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await Food.findByIdAndDelete(req.body.id);
        res.status(201).json({ success:true,message:"food removed successfully"});
    } catch (error) {
        console.log(error);
        res.status(401).json({message:error.message});
    }
}


export {
    addFood,
    listFood,
    removeFood
}