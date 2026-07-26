import  {createEmployee,getEmployee,getEmployeeById,
    updateEmployeeData,deleteEmployee,getMyProfile,updateMyProfile} 
from "../controllers/employee.controller.js";
import {validate,validateParams}  from "../middlewares/validation.middleware.js";
import {objectIdValidator} from "../validator/common.validator.js"
import {createEmployeeValidator,updateEmployeeValidator,updateMyProfileValidator} from "../validator/employee.validator.js"

import express from "express";

const employeeRouter = express.Router();


employeeRouter.post("/",validate(createEmployeeValidator),createEmployee);

employeeRouter.get("/",getEmployee);

employeeRouter.get("/:id",validateParams(objectIdValidator),getEmployeeById);

employeeRouter.get("/profile/me",getMyProfile);

employeeRouter.patch("/:id",validateParams(objectIdValidator),validate(updateEmployeeValidator),updateEmployeeData);

employeeRouter.patch("/profile/me",validate(updateMyProfileValidator),updateMyProfile);

employeeRouter.delete("/:id",validateParams(objectIdValidator),deleteEmployee);


export default employeeRouter;