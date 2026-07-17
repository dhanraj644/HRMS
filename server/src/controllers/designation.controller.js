import Designation from "../models/designation.model.js";
import Department from "../models/department.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"


const createDesignation = asyncHandler(async (req,res) => {
    
    const {designationName,department_id,description,status} = req.body;


    const department = await Department.findById(department_id);

    if(!department)
    {
        throw new ApiError(404,"department not found")
    }

    const existDesignation = await Designation.findOne({designationName,department_id})

    if(existDesignation)
    {
        throw new ApiError(409,"designation already exist")
    }


    const designation= await Designation.create({designationName,department_id,description,status})



    return res.status(201).json(
        new ApiResponse(201,"designation is created successfully",designation)
    )

})


const getDesignation = asyncHandler(async (req,res) => {
    
    const designation= await Designation.find()
    .populate("department_id", "departmentName departmentCode")
    .sort({ createdAt: -1 });


    return res.status(200).json(
        new ApiResponse(200,"all designation", designation)
    )
})

const getDesignationById= asyncHandler(async (req,res) => {
    
    

    const designation = await Designation.findById(req.params.id)
    .populate("department_id", "departmentName departmentCode")


    if(!designation)
    {
        throw new ApiError(404,"designation not found")
    }

    returnres.status(200).json(
        new ApiResponse(200,"designations",designation)
    )
})


const updateDesignation = asyncHandler(async (req,res) => {
    
    const {designationName,department_id,description,status} = req.body;


    const designation = await findById(req.params.id)

    if(!designation)
    {
        throw new ApiError(404,"designation not found")
    }



    if(department_id)
    {
        const department = await Department.findById(department_id);

        if(!department)
        {
            throw new ApiError(404,"department not found")
        }

        designation.department_id=department_id;
    }

    if(designationName)
    {
        const existDesignation = await Designation.findOne({
            designationName,
            department_id: department_id || designation.department_id,
            _id : {$ne: req.params.id}
        })

        if(existDesignation)
        {
            throw new ApiError(409, "designation already exist")
        }

        designation.designationName=designationName;
    }


    designation.description=description??designation.description;
    designation.status= status??designation.status;

    await designation.save()


    return res.status(200).json(
        new ApiResponse(200,"designation updated successfully", designation)
    )
})


const deleteDesignationById = asyncHandler(async (req,res) => {
    

    const designation = await Designation.findById(req.params.id);

    if(!designation)
    {
        throw new ApiError(404,"designation not found")
    }


    return res.status(200).json(
        new ApiResponse(200,"designation is deleted successfully",[])
    )
})


const getDesignationByDepartmentId = asyncHandler(async (req,res) => {
    
    const {departmentId} = req.params.departmentId;


    const designation = await Designation.find({department_id:departmentId,status:"Active"})
    .populate("department_id", 'departmentName');


    return res.status(200).json(
        new ApiResponse(200, "Designation By department", designation)
    )
})

export {createDesignation,getDesignation,getDesignationById,updateDesignation,deleteDesignationById,getDesignationByDepartmentId}

