import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import  urlencoded  from 'express';
import connectDB from './config/db.js';
import foodRouter from './routers/food.route.js';
import userRouter from './routers/user.route.js';
import cartRouter from './routers/cart.route.js';
import orderRouter from './routers/order.route.js';

const app = express();

const port = process.env.PORT

//app config
app.use(express.json())
app.use(cors())
app.use(urlencoded())

//connect to database
connectDB()
//api endoints
app.use('/api/v1/food',foodRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/order',orderRouter)
app.use('/images',express.static('uploads'));


app.get('/',(req,res)=>{
    res.send("hello me");
    
})

app.listen(port,()=>{
    console.log(`Server start on http://localhost:${port}`)
})
