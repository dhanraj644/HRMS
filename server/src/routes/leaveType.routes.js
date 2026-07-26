import express from "express";

import {
    createLeaveType,
    getLeaveTypes,
    getLeaveTypeById,
    updateLeaveType,
    deleteLeaveType
} from "../controllers/leaveType.controller.js";

import  auth  from "../middlewares/auth.middleare.js";
import  {authorize} from "../middlewares/autherize.middleware.js";
import {createLeaveTypeValidator,updateLeaveTypeValidator,leaveTypeIdValidator} from "../validator/leaveType.validator.js"
import {validate,validateParams} from "../middlewares/validation.middleware.js";
import {objectIdValidator} from "../validator/common.validator.js"
const router = express.Router();

router.post(
    "/",
    auth,
    authorize("Admin", "HR"),
    validate(createLeaveType),
    createLeaveType
);

router.get(
    "/",
    auth,
    authorize("Admin", "HR", "Manager", "Employee"),
    getLeaveTypes
);

router.get(
    "/:id",
    auth,
    authorize("Admin", "HR", "Manager", "Employee"),
    validateParams(objectIdValidator),
    getLeaveTypeById
);

router.patch(
    "/:id",
    auth,
    authorize("Admin", "HR"),
    validate(updateLeaveTypeValidator),
    validateParams(objectIdValidator),
    updateLeaveType
);

router.delete(
    "/:id",
    auth,
    authorize("Admin"),
    validateParams(objectIdValidator),
    deleteLeaveType
);

export default router;