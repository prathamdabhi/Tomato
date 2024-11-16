import express from "express";
import { addFood, listFood, removeFood } from "../controllers/food.Controller.js";
import upload from "../middlewares/upload.middleware.js";

const foodRouter = express.Router()

foodRouter.post('/addfood',upload.single('image'),addFood)
foodRouter.get('/listfood',listFood);
foodRouter.post('/removefood',removeFood);


export default foodRouter