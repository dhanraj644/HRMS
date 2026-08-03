import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import LeaveRequest from "../models/leaveRequest.model.js"
import Employee from "../models/employee.model.js"
import LeaveType from "../models/leaveType.model.js"


const applyLeave = asyncHandler(async (req, res) => {

    const { leaveType_id, fromDate, toDate, reason } = req.body;

    const employee = await Employee.findOne({
        user_id: req.user._id
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
        throw new ApiError(400, "From Date cannot be greater than To Date.");
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = await LeaveRequest.create({
        employee_id: employee._id,
        leaveType_id,
        fromDate,
        toDate,
        totalDays,
        reason
    });

    return res.status(201).json(
        new ApiResponse(201, "Leave applied successfully.", leaveRequest)
    );

});


const getLeaveRequests = asyncHandler(async (req, res) => {

    const leaveRequests = await LeaveRequest.find()
        .populate("employee_id", "firstName lastName employeeCode")
        .populate("leaveType_id", "name")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, "Leave requests fetched successfully.", leaveRequests)
    );

});


const getMyLeaves = asyncHandler(async (req, res) => {

    const employee = await Employee.findOne({ user_id: req.user._id });

    if (!employee) {
        throw new ApiError(404, "Employee not found.");
    }

    const leaveRequests = await LeaveRequest.find({ employee_id: employee._id })
        .populate("leaveType_id", "name")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, "My leaves fetched successfully.", leaveRequests)
    );

});


const getLeaveRequestById = asyncHandler(async (req, res) => {

    const leaveRequest = await LeaveRequest.findById(req.params.id)
        .populate("employee_id", "firstName lastName employeeCode")
        .populate("leaveType_id", "name");

    if (!leaveRequest) {
        throw new ApiError(404, "Leave request not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, "Leave request fetched.", leaveRequest)
    );

});


const updateLeaveStatus = asyncHandler(async (req, res) => {

    const { status, rejectionReason } = req.body;

    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
        throw new ApiError(404, "Leave request not found.");
    }

    if (leaveRequest.status !== "Pending") {
        throw new ApiError(400, "Only pending leave requests can be updated.");
    }

    leaveRequest.status = status;
    leaveRequest.approvedBy = req.user._id;

    if (status === "Rejected" && rejectionReason) {
        leaveRequest.rejectionReason = rejectionReason;
    }

    await leaveRequest.save();

    return res.status(200).json(
        new ApiResponse(200, `Leave request ${status.toLowerCase()} successfully.`, leaveRequest)
    );

});


const cancelLeave = asyncHandler(async (req, res) => {

    const employee = await Employee.findOne({ user_id: req.user._id });

    if (!employee) {
        throw new ApiError(404, "Employee not found.");
    }

    const leaveRequest = await LeaveRequest.findOne({
        _id: req.params.id,
        employee_id: employee._id
    });

    if (!leaveRequest) {
        throw new ApiError(404, "Leave request not found.");
    }

    if (leaveRequest.status !== "Pending") {
        throw new ApiError(400, "Only pending leave requests can be cancelled.");
    }

    leaveRequest.status = "Cancelled";
    await leaveRequest.save();

    return res.status(200).json(
        new ApiResponse(200, "Leave request cancelled.", leaveRequest)
    );

});


export { applyLeave, getLeaveRequests, getMyLeaves, getLeaveRequestById, updateLeaveStatus, cancelLeave };
