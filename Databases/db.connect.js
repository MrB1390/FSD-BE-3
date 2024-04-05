import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = process.env.MONGODBCONNECTIONSTRING;

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(dbConnect);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }

}

export default connectDB;