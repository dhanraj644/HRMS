import express from 'express'
import Router from './routes/index.js';
import errorHandler from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST' ,'PUT','PATCH'],
};

app.use(cors(corsOptions))


app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api/v1/",Router);

app.use((req,res)=>{
    res.status(404).json({msg:"api url not found"})
})
app.use(errorHandler)

export default app;