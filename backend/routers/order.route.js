import express from 'express';
import { placeOrder, verifyOrder, usersOrders } from '../controllers/order.controller.js';
import authUser from '../middlewares/authuser.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/place',authUser(),placeOrder);
orderRouter.post('/verify',authUser(),verifyOrder);
orderRouter.post('/userorders',authUser(),usersOrders)

export default orderRouter