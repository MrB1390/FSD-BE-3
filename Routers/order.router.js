import express from 'express';
import { createOrder, deleteOrderById, getOrderAll, getOrderById, updateOrderById,updateOrderStatusById } from '../Controller/order.controller.js';
import { authLogin } from '../Middleware/auth.middleware.js';



const router = express.Router();

router.post('/order',authLogin, createOrder);
router.get('/getOrder',authLogin, getOrderAll);
router.get('/:id',authLogin,getOrderById);
router.put('/edit/:id',authLogin,updateOrderById);
router.patch('/editStatus/:id',authLogin, updateOrderStatusById); // Define PATCH route for updating order status
router.delete('/delete/:id',authLogin,deleteOrderById);

export default router;