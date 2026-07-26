import LeaveType from "../models/leaveType.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import { object } from "joi";



const createLeaveType = asyncHandler(async (req,res) => {
    
    const {
        leaveName,
        totalDays,
        description,
        status
    } = req.body;


    const leaveTypeExists = await LeaveType.findOne({
        leaveName
    });

    if (leaveTypeExists) {
        throw new ApiError(409,"Leave Type already exists.");
    }

    const leaveType = await LeaveType.create({
        leaveName,
        totalDays,
        description,
        status
    });

    return res.status(201).json(
        new ApiResponse(201,"Leave Type is created successfully",leaveType)
    )

})


const getLeaveTypes = asyncHandler(async (req,res) => {
    
    const leaveType = await LeaveType.find().sort({createdAt:-1})

    
    
    return res.status(200).json(
        new ApiResponse(200,"Leave Types fetched successfully.",leaveType)
    )

})


const getLeaveTypeById = asyncHandler(async (req,res) => {
    
    const leaveType = await LeaveType.findById(req.params.id);

    if(!leaveType)
    {
        throw new ApiError(404 ,"Leave Types not found")
    }


    return res.status(200).json(
        new ApiResponse(200,"Leave Type fetched successfully.",leaveType)
    )
})


const updateLeaveType = asyncHandler(async (req,res) => {

    const leaveType = await LeaveType.findById(req.params.id);

    if(!leaveType)
    {
      throw new ApiError(404 ,"Leave Types not found")
    }


    if(req.body.leaveName)
    {
        const exists = await LeaveType.findOne({
            leaveName:req.body.leaveName,
            _id : {$ne : req.params.id}
        })

        if(exists)
        {
            throw new ApiError(409,"leave Type already exist")
        }
    }


    object.assign(leaveType,req.body);

    await leaveType.save();


    return res.status(200).json(
        new ApiResponse(200,"leaveType update successfully",leaveType)
    )
    
})

const deleteLeaveType = asyncHandler(async (req,res) => {
  
    const leaveType = await LeaveType.findById(req.params.id);

    if(!leaveType)
    {
        throw new ApiError(404,"leave Type not found")
    }


    await leaveType.deleteOne();


    return res.status(200).json(
        new ApiResponse(200,"leave Type is deleted successfully")
    )
})

export {createLeaveType,getLeaveTypes,getLeaveTypeById,updateLeaveType,deleteLeaveType}