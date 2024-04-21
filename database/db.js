import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export function dbConnection(){
    const params = {
        useNewUrlParser: true,
        //useUnifiedTopology: true,

    };
     
    try {
        mongoose.connect(process.env.DB_URL,params);
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error occur while connecting database", error.message);
    }
}