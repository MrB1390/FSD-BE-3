import express from 'express';
import multer from 'multer';
import path from 'path';
import { createCategory, deleteCategoryById, getCategoryAll, getCategoryById, updateCategoryById } from '../Controller/category.controller.js';
import { authAccessLogin } from '../Middleware/auth.middleware.js';



const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/category/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

router.post('/category', upload.single('image'),authAccessLogin, createCategory);
router.post('/category',authAccessLogin, createCategory);
router.get('/getCategory',authAccessLogin, getCategoryAll);
router.get('/:id',authAccessLogin,getCategoryById);
router.put('/edit/:id',authAccessLogin,updateCategoryById);
router.delete('/delete/:id',authAccessLogin,deleteCategoryById);

export default router;