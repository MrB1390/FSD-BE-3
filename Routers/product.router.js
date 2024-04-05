import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProduct, deleteProductById, getProductAll, getProductById, updateProductById, updateProductStatusById } from '../Controller/product.controller.js';
import { authAccessLogin, authLogin } from '../Middleware/auth.middleware.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/product/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

router.post('/product', upload.single('image'),authAccessLogin, createProduct);
router.post('/product',authAccessLogin, createProduct);
router.get('/getProduct',authLogin, getProductAll);
router.get('/:id',authAccessLogin, getProductById);
router.put('/edit/:id',authAccessLogin,updateProductById);
router.patch('/editStatus/:id',authAccessLogin, updateProductStatusById); // Define PATCH route for updating product status
router.delete('/delete/:id',authAccessLogin,deleteProductById);

export default router;