import express from 'express'
import Router from './routes/index.js';
import errorHandler from "./middlewares/error.middleware.js"
const app=express();

app.use(express.json());
app.use(express.urlencoded());


app.use("/api/v1/",Router);


app.use(errorHandler)
export default app;