import express from 'express';
import { logOut, resetPassword, userLogin, verifyEmail } from '../Controller/auth.controller.js';

const router = express.Router();

router.post('/login', userLogin);
router.post('/email',verifyEmail);
router.put('/reset',resetPassword);
router.post('/logout', logOut)

export default router;
