import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import express from "express";
 

const Router = express.Router()


Router.use('/user', userRouter);

export default Router;