import express from "express";
import {
    applyLeave,
    getLeaveRequests,
    getMyLeaves,
    getLeaveRequestById,
    updateLeaveStatus,
    cancelLeave
} from "../controllers/leaveRequest.controller.js";
import auth from "../middlewares/auth.middleare.js";
import { authorize } from "../middlewares/autherize.middleware.js";
import { validateParams } from "../middlewares/validation.middleware.js";
import { objectIdValidator } from "../validator/common.validator.js";

const leaveRequestRouter = express.Router();

leaveRequestRouter.post("/", auth, authorize("Employee", "Admin", "HR", "Manager"), applyLeave);


leaveRequestRouter.get("/", auth, authorize("Admin", "HR", "Manager"), getLeaveRequests);


leaveRequestRouter.get("/my-leaves", auth, authorize("Employee", "Admin", "HR", "Manager"), getMyLeaves);

leaveRequestRouter.get("/:id", auth, validateParams(objectIdValidator), getLeaveRequestById);


leaveRequestRouter.patch("/:id/status", auth, authorize("Admin", "HR", "Manager"), validateParams(objectIdValidator), updateLeaveStatus);

leaveRequestRouter.patch("/:id/cancel", auth, validateParams(objectIdValidator), cancelLeave);

export default leaveRequestRouter;
