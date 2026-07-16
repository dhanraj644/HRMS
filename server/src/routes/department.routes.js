import {addDepartment,getAllDepartment,getDepartmentById,updateDepartmentById,deleteDepartmentById} from "../controllers/department.controller.js";
import express from "express";
import {createDepartmentValidator,updateDepartmentValidator} from "../validator/department.validator.js"
import validator from "../middlewares/validation.middleware.js"
const departmentRouter = express.Router();



departmentRouter.post("/",validator(createDepartmentValidator),addDepartment);

departmentRouter.get("/", getAllDepartment);

departmentRouter.get("/:id", getDepartmentById);

departmentRouter.patch("/:id",validator(updateDepartmentValidator), updateDepartmentById);

departmentRouter.delete("/:id", deleteDepartmentById);


export default departmentRouter;
