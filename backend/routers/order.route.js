import express from 'express';
import { placeOrder, verifyOrder, usersOrders, listOrders, changeOrderStatus } from '../controllers/order.controller.js';
import authUser from '../middlewares/authuser.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/place',authUser(),placeOrder);
orderRouter.post('/verify',authUser(),verifyOrder);
orderRouter.post('/userorders',authUser(),usersOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/changestatus',changeOrderStatus)

export default orderRouter