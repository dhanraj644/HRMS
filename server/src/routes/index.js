import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import departmentRouter from "./department.routes.js";
import designationRouter from "./designation.routes.js";
import employeeRouter from "./employee.routes.js";
import attandanceRouter from "./attandance.routes.js";
import leaveTypeRouter from "./leaveType.routes.js";
import leaveRequestRouter from "./leaveRequest.routes.js";
import express from "express";

const Router = express.Router();

Router.use('/auth', authRouter);
Router.use('/user', userRouter);
Router.use('/department', departmentRouter);
Router.use('/designation', designationRouter);
Router.use('/employee', employeeRouter);
Router.use('/attandance', attandanceRouter);
Router.use('/leave-type', leaveTypeRouter);
Router.use('/leave-request', leaveRequestRouter);

export default Router;