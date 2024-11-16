import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import authUser from '../middlewares/authuser.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/place',authUser(),placeOrder)

export default orderRouter