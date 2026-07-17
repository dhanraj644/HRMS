import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js"
import departmentRouter from "./department.routes.js"
import designationRouter from "./designation.routes.js"
import express from "express";

const Router = express.Router()

Router.use('/auth', authRouter);

Router.use('/user', userRouter);

Router.use('/department', departmentRouter);

Router.use('/designation', designationRouter);


export default Router;