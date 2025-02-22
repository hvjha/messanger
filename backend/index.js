import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 

// routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute);
app.listen(PORT,()=>{
    connectDB();
    console.log(`server listen at port ${PORT}`)
})