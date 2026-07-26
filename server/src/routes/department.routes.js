import {addDepartment,getAllDepartment,getDepartmentById,updateDepartmentById,deleteDepartmentById} from "../controllers/department.controller.js";
import express from "express";
import {createDepartmentValidator,updateDepartmentValidator} from "../validator/department.validator.js"
import {validate,validateParams}  from "../middlewares/validation.middleware.js";
import {objectIdValidator} from "../validator/common.validator.js"
const departmentRouter = express.Router();



departmentRouter.post("/",validator(createDepartmentValidator),addDepartment);

departmentRouter.get("/", getAllDepartment);

departmentRouter.get("/:id",validateParams(objectIdValidator), getDepartmentById);

departmentRouter.patch("/:id",validateParams(objectIdValidator),validator(updateDepartmentValidator), updateDepartmentById);

departmentRouter.delete("/:id",validateParams(objectIdValidator), deleteDepartmentById);


export default departmentRouter;
