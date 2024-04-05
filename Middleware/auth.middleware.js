import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/user.schema.js';

dotenv.config();

export const authLogin = async(req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(400).json({
            message: "Token Missing"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        const user = await User.findById(req.user._id)
        if(!user){
            res.status(400).json({
                message: "Unauthorized"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server Error or Invalid Token",
        });
    }
}


export const authAccessLogin = async(req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(400).json({
            message: "Token Missing"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({
                message: "Unauthorized"
            })
        }
        if(user.role === 'user'){
           return  res.status(403).json({
                message: "Access Denied"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server Error or Invalid Token",
        });
    }
}