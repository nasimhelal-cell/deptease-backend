import dotenv from 'dotenv';
import express from "express";
import { auth } from "../middlewares/auth.js";
import globalError from "./error.js";
import globalMiddlewares from "./middleware.js";
import globalRouter from "./routes.js";

dotenv.config('../.env')
const app = express();

app.use(globalMiddlewares)

app.use(globalRouter)

app.get('/health',auth,(req,res)=>{
    console.log(req.user)
    res.status(200).json({message:"Everything is ok"})
})

app.use(globalError)

export default app