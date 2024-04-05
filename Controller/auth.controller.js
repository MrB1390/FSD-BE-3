import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/user.schema.js';
import mail from '../Services/mail.service.js';

dotenv.config();

export const userLogin = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({
                message: "User not Found"
            })
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({_id:user._id,role:user.role},process.env.SECRET_KEY);
        res.cookie('token',token,{
            httpOnly: true,
            expiresIn: new Date(Date.now() + (60*60*1000)),
            sameSite: 'none',
            secure: 'true'
        });
        res.status(200).json({
            message: "Login Successfully",
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server Error",
        });
    }
}

export const verifyEmail = async(req,res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({
                message:"User not Found"
            })
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn: '1h'})
        mail(token,email);
        res.status(200).json({
            message: "Mail sent",
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
         message: "Internal Server Error"
        })
    }
}

export const resetPassword = async(req,res) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            message:"token missing"
        })
    }
    const {password,confirmPassword} = req.body
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const id = decoded._id;
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(401).json({
                message:"user not found"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Password and Confirm Password are not same"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user.password=hashPassword;
        res.status(200).json({
            message: "Password Updated Successfully",
            data: hashPassword
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Invalid Token or Internal Server Error"
        })
    }
}

export const logOut = async(req,res) => {
    try {
       // Clear the authentication cookie
       res.clearCookie('token');
       res.status(200).json({
        message: "Logout Successfully"
       })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server Error"
      })
    }
  }