import {createDesignation,getDesignation,getDesignationById,
         updateDesignation,deleteDesignationById,getDesignationByDepartmentId}
         from "../controllers/designation.controller.js";
import express from "express";

import {createDesignationValidator,updateDesignationValidator} from "../validator/designation.validator.js"
import {validate,validateParams}  from "../middlewares/validation.middleware.js";
import {objectIdValidator} from "../validator/common.validator.js"

const designationRouter = express.Router()

designationRouter.post("/",validate(createDesignationValidator),createDesignation);

designationRouter.get("/", getDesignation);

designationRouter.get("/department/:departmentId", getDesignationByDepartmentId);

designationRouter.get("/:id",validateParams(objectIdValidator), getDesignationById);

designationRouter.patch("/:id",validateParams(objectIdValidator),validate(updateDesignationValidator),updateDesignation);

designationRouter.delete("/:id",validateParams(objectIdValidator), deleteDesignationById);



export default designationRouter;