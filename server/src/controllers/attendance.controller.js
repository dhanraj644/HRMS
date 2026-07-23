import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Attendance from "../models/attendance.model.js"
import Employee from "../models/employee.model.js"

const checkIn = asyncHandler(async (req, res) => {

    const employee = await Employee.findOne({
        user_id: req.user.id
    });

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceExists = await Attendance.findOne({
        employee_id: employee._id,
        date: today
    });

    if (attendanceExists) {
        throw new ApiError(409, "Already checked in today");
    }

    const attendance = await Attendance.create({
        employee_id: employee._id,
        date: today,
        checkIn: new Date(),
        status: "Present"
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "Check In Successfully",
            attendance
        )
    );

});



const checkOut = asyncHandler(async (req, res) => {

    const employee = await Employee.findOne({
        user_id: req.user.id
    });

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
        employee_id: employee._id,
        date: today
    });

    if (!attendance) {
        throw new ApiError(404, "Check In record not found");
    }

    if (attendance.checkOut) {
        throw new ApiError(409, "Already checked out");
    }

    attendance.checkOut = new Date();

    const totalHours =
        (attendance.checkOut - attendance.checkIn) /
        (1000 * 60 * 60);

    attendance.workingHours = Number(
        totalHours.toFixed(2)
    );

    attendance.overtimeHours =
        totalHours > 9
            ? Number((totalHours - 9).toFixed(2))
            : 0;

    if (totalHours < 4) {
        attendance.status = "Half Day";
    }

    await attendance.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Check Out Successfully",
            attendance
        )
    );

});


const getMyAttendance = asyncHandler(async (req, res) => {

    const employee = await Employee.findOne({
        user_id: req.user.id
    });

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    const attendance = await Attendance.find({
        employee_id: employee._id
    }).sort({ date: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Attendance fetched successfully",
            attendance
        )
    );

});

const createAttandance = asyncHandler(async (req,res) => {
    
     const {
      employee_id,
      date,
      checkIn,
      checkOut,
      workingHours,
      overtimeHours,
      status,
      remarks,
    } = req.body;


    const attendanceExists = await Attendance.findOne({
      employee_id,
      date,
    });

    if(attendanceExists){
        throw new ApiError(409, "Attendance already exists for this employee.");
    }

     const attendance = await Attendance.create({
      employee_id,
      date,
      checkIn,
      checkOut,
      workingHours,
      overtimeHours,
      status,
      remarks,
    });


    return res.status(201).json(

        new ApiResponse(201,"attendance created successfully",attendance)
    )
})


const getAttendances = asyncHandler(async (req,res) => {
    
    const attendance = await Attendance.find()
    .populate("employee_id", "employeeCode firstName lastName")
    .sort({date:-1})

    return res.status(200).json(
        new ApiResponse(200,"attandance fetched successfully",attendance)
    )
})

const getAttendancesById = asyncHandler(async (req,res) => {
    
    const attandance = await Attendance.findById(req.params.id)
    .populate("employee_id", "employeeCode fullName lastName")

    if(!attandance)
    {
        throw new ApiError(404, "attandance not found");
    }


    return res.status(200).json(
        new ApiResponse(200,"attendance fetched successfully",attandance)
    )
})


const updateAttandance = asyncHandler(async (req,res) => {
    
    const attandance = await Attendance.findById(req.params.id)

    if(!attandance)
    {
        throw new ApiError(404,"attandance not found",attandance)
    }

    Object.assign(attandance,req.body);

    await attandance.save();


    return res.status(200).json(
        new ApiResponse(200,"attandance updated",attandance)
    )
})


const deleteAttandance = asyncHandler(async (req,res) => {
    

    const attandance = await Attendance.findById(req.params.id)

    if(!attandance)
    {
        throw new ApiError(404,"attandance not found")
    }

    await attandance.deleteOne();


    return res.status(200).json(

        new ApiResponse(200,"attandance deleted successfully")
    )
})


export {checkIn,checkOut,getMyAttendance,createAttandance,
    getAttendances,getAttendancesById,updateAttandance,deleteAttandance}