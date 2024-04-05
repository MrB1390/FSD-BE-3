import express from 'express';
import multer from 'multer';
import path from 'path';
import { createUser, deleteUserById, getUserAll, getUserById, updateUserById,updateUserRoleById } from '../Controller/user.controller.js';
import { authAccessLogin } from '../Middleware/auth.middleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

router.post('/user', upload.single('image'),authAccessLogin, createUser);
router.post('/user',authAccessLogin, createUser);
router.get('/getUser',authAccessLogin, getUserAll);
router.get('/:id',authAccessLogin,getUserById);
router.put('/edit/:id',authAccessLogin,updateUserById);
router.patch('/editRole/:id',authAccessLogin, updateUserRoleById); // Define PATCH route for updating user role
router.delete('/delete/:id',authAccessLogin,deleteUserById);


export default router;