import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import LeaveRequest from "../models/leaveRequest.model.js"


const applyLeave = asyncHandler(async (req, res) => {

    const {
        leaveType_id,
        fromDate,
        toDate,
        reason
    } = req.body;

    const employee = await Employee.findOne({
        user_id: req.user.id
    });

    if (!employee) {
        throw new ApiError(404, "Employee not found.");
    }

    const leaveType = await LeaveType.findById(leaveType_id);

    if (!leaveType) {
        throw new ApiError(404, "Leave Type not found.");
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);

    if (start > end) {
        throw new ApiError(
            400,
            "From Date cannot be greater than To Date."
        );
    }

    const totalDays =
        Math.ceil(
            (end - start) / (1000 * 60 * 60 * 24)
        ) + 1;
        

    const leaveRequest = await LeaveRequest.create({

        employee_id: employee._id,
        leaveType_id,
        fromDate,
        toDate,
        totalDays,
        reason

    });

    return res.status(201).json(

        new ApiResponse(
            201,
            "Leave applied successfully.",
            leaveRequest
        )

    );

});
