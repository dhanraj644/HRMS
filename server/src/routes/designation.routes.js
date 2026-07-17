import {createDesignation,getDesignation,getDesignationById,
         updateDesignation,deleteDesignationById,getDesignationByDepartmentId}
         from "../controllers/designation.controller.js";
import express from "express";

const designationRouter = express.Router()

designationRouter.post("/",createDesignation);

designationRouter.get("/", getDesignation);

designationRouter.get("/:id", getDesignationById);

designationRouter.patch("/:id", updateDesignation);

designationRouter.delete("/:id", deleteDesignationById);

designationRouter.get("/:departmentId", getDesignationByDepartmentId);


export default designationRouter;