import {createDesignation,getDesignation,getDesignationById,
         updateDesignation,deleteDesignationById,getDesignationByDepartmentId}
         from "../controllers/designation.controller.js";
import express from "express";

import {createDesignationValidator,updateDesignationValidator} from "../validator/designation.validator.js"
import validate from "../middlewares/validation.middleware.js";

const designationRouter = express.Router()

designationRouter.post("/",validate(createDesignationValidator),createDesignation);

designationRouter.get("/", getDesignation);

designationRouter.get("/department/:departmentId", getDesignationByDepartmentId);

designationRouter.get("/:id", getDesignationById);

designationRouter.patch("/:id",validate(updateDesignationValidator),updateDesignation);

designationRouter.delete("/:id", deleteDesignationById);



export default designationRouter;