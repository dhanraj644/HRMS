import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js"
import express from "express";

const Router = express.Router()

Router.use('/auth', authRouter);

Router.use('/user', userRouter);

export default Router;