import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"


const addDepartment =asyncHandler(async (req,res) => {
    
    const {departmentName,departmentCode,description,status,} = req.body;

    const existingDepartment = await Department.findOne({$or:[{departmentName},{departmentCode}]})

    if(existingDepartment)
    {
        throw new ApiError(409,"department already exist")
    }

    const department = await Department.create({departmentName,departmentCode,description,status});



   return res.status(201).json(
      new ApiResponse(201, "Department is created",department)  
    )

});

const getAllDepartment = asyncHandler(async (req,res) => {


    const department = await Department.find({isDeleted:false}).sort({createdAt:-1})

    return res.status(200).json(
        new ApiResponse(200 ,"all department",department)
    )
    
})

const getDepartmentById = asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    const department = await Department.find({_id :id,isDeleted:false});

    if(!department)
    {
        throw new ApiError(404 , "Department not found")
    }


    return res.status(200).json(
        new ApiResponse(200,"department",department)
    )
});

const updateDepartmentById = asyncHandler(async (req,res)=>{

    const {departmentName,departmentCode,description,status} = req.body;

    const department = await Department.findById(req.params.id);

    if(!department)
    {
        throw new ApiError(404, "department not found")
    }


    if(departmentName)
    {
        const nameExist = await Department.find({departmentName,_id:{$ne:req.params.id}})

        if(nameExist)
        {
            throw new ApiError(409,"department name already exist")
        }

        department.departmentName=departmentName;
    }

     if(departmentCode)
    {
        const departmentCodeExist = await Department.find({departmentCode,_id:{$ne:req.params.id}})

        if(departmentCodeExist)
        {
            throw new ApiError(409,"department code already exist")
        }

        department.departmentCode=departmentCode;
    }

    department.description = description ?? department.description;
    department.status = status ?? department.status;

    await department.save();

    return res.status(200).json(
        new ApiResponse(200,"department updated",department)
    )
})

const deleteDepartmentById = asyncHandler(async (req,res)=>{



    const department= await Department.findById(req.params.id);

    if(!department)
    {
        throw new ApiError(404,"department not found")
    }

    department.isDeleted = true;

    await department.save();


    return res.status(200).json(
        new ApiResponse(200,"department is deleted",[])
    )
    
})

export {addDepartment,getAllDepartment,getDepartmentById,updateDepartmentById,deleteDepartmentById}