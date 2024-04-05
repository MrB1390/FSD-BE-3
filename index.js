import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './Databases/db.connect.js';
import authRouter from './Routers/auth.router.js'
import userRouter from './Routers/user.router.js';
import productRouter from './Routers/product.router.js';
import categoryRouter from './Routers/category.router.js';
import orderRouter from './Routers/order.router.js';

dotenv.config();

const allowedOrigin = ['https://order-management-3405.netlify.app']

const app = express();

app.use(cors({ credentials: true, origin: allowedOrigin }));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/apiProduct', productRouter);
app.use('/apiCategory', categoryRouter);
app.use('/apiOrder', orderRouter);

app.get('/',(req,res) =>{
    res.status(200).send(`<h1>Order Management</h1>`)
})

const port = process.env.PORT;

app.listen(port,()=>{
     console.log(`App is running on Port ${port}`);
})
