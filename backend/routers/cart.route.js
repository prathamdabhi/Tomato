import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cart.controller.js';
import authUser from '../middlewares/authuser.middleware.js';

const cartRouter = express.Router();
cartRouter.post('/add',authUser(),addToCart);
cartRouter.post('/remove',authUser(),removeFromCart);
cartRouter.get('/getcart',authUser(),getCart);

export default cartRouter;