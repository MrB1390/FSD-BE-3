import express from 'express';
import multer from 'multer';
import path from 'path';
import { logOut, resetPassword, userLogin, verifyEmail } from '../Controller/auth.controller.js';
import { createUser } from '../Controller/user.controller.js';

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

router.post('/register', upload.single('image'), createUser);
router.post('/login', userLogin);
router.post('/email',verifyEmail);
router.put('/reset',resetPassword);
router.post('/register',createUser)
router.post('/logout', logOut)

export default router;
