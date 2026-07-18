import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Employee from "../models/employee.model.js"
import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import Designation from "../models/designation.model.js";



const createEmployee = asyncHandler(async (req,res) => {
    
      const {
      user_id,
      department_id,
      designation_id,
      reportingManager,

      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      bloodGroup,
      maritalStatus,
      photo,

      joiningDate,
      employeeType,
      status,
      salary,

      address,
      emergencyContact,
      bankDetails,
      documents,
    } = req.body;


       const user = await User.findById(user_id);

    if (!user) {

        throw new ApiError(404, "user not found");
    }

    const department = await Department.findById(department_id);

    if (!department) {
        throw new ApiError(404, "department not found");
    }

       const designation = await Designation.findById(designation_id);

    if (!designation) {
        
    throw new ApiError(404, "designation not found");

    }


     const employeeExists = await Employee.findOne({
      user_id,
    });


    if (employeeExists) {
     
         throw new ApiError(409, "employee not found");

    }

    const existEmail = await Employee.findOne({email});

    if(existEmail)
    {
        throw new ApiError(409, "email already exist")
    };

    const phoneExist = await Employee.findOne({phone});

    if(phoneExist)
    {
        throw new ApiError(409, "phone number  already exist")
    };

     // Generate Employee Code
    const count = await Employee.countDocuments();

const employeeCode = `EMP-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

    const employee = await Employee.create({

      user_id,

      department_id,

      designation_id,

      reportingManager,

      employeeCode,

      firstName,

      lastName,

      email,

      phone,

      gender,

      dob,

      bloodGroup,

      maritalStatus,

      photo,

      joiningDate,

      employeeType,

      status,

      salary,

      address,

      emergencyContact,

      bankDetails,

      documents,

      createdBy: req.user.id,
    });

    return res.status(201).json(
        new ApiResponse(201, "employee is created successfully",employee)
    )
});


const getEmployee = asyncHandler(async (req,res) => {
    

    const employee = await Employee.find({isDeleted:false})
      .populate("user_id", "userName email role_id")
      .populate("department_id", "departmentName departmentCode")
      .populate("designation_id", "designationName")
      .populate("reportingManager", "firstName lastName employeeCode")
      .populate("createdBy", "userName")
      .populate("updatedBy", "userName")
      .sort({ createdAt: -1 });


 return res.statsu(200).json(
    new ApiResponse(200,`toatal employees`, employee)
 )

})


const getEmployeeById = asyncHandler(async (req,res) => {
    
    const employee = await Employee.findOne({ _id : req.params.id ,isDeleted:false})
      .populate("user_id", "userName email role_id")
      .populate("department_id", "departmentName departmentCode")
      .populate("designation_id", "designationName")
      .populate("reportingManager", "firstName lastName employeeCode")
      .populate("createdBy", "userName")
      .populate("updatedBy", "userName")
      .sort({ createdAt: -1 });

      if(!employee)
      {
        throw new ApiError(404 , "employee not found")
      }


     return res.status(200).json(
        new ApiResponse(200,"employee",employee)
     )
})


const updateEmployeeData = asyncHandler(async (req,res) => {
    
     const { id } = req.params;

    const employee = await Employee.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!employee) {

        throw new ApiError(404, "employee not found")
    }

    if (req.body.department_id) {
      const department = await Department.findById(req.body.department_id);

      if (!department) {
        throw new ApiError(404, "department not found")
        
      }
    }

   if (req.body.designation_id) {
      const designation = await Designation.findById(
        req.body.designation_id
      );

      if (!designation) {
        throw new ApiError(404, "designation not found")
      }
    }




    if (req.body.email) {
      const emailExists = await Employee.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });

      if (emailExists) {
       
        throw new ApiError(409,"email aleady exist")
      }
    }



    if (req.body.phone) {
      const phoneExists = await Employee.findOne({
        phone: req.body.phone,
        _id: { $ne: id },
      });

      if (phoneExists) {

        throw new ApiError(409,"phone number aleady exist")
       
      }
    }


    Object.assign(employee, req.body);

    employee.updatedBy = req.user.id;

    await employee.save();


    const updatedEmployee = await Employee.findById(employee._id)
      .populate("user_id", "userName email")
      .populate("department_id", "departmentName")
      .populate("designation_id", "designationName")
      .populate("reportingManager", "firstName lastName employeeCode")
      .populate("createdBy", "userName")
      .populate("updatedBy", "userName");


      return res.statsu(200).json(

        new ApiResponse(200, "employee updated successfully", updatedEmployee)
      )

})


const deleteEmployee = asyncHandler(async (req,res) => {
    
    const employee = await Employee.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if(!employee)
    {
        throw new ApiError(404 ,"employee not found")
    }

    employee.isDeleted = true;
    employee.updatedBy = req.user.id;

    await employee.save();

    return res.status(200).json(
        new ApiResponse(200,"employee is deleted successfully.")
    )

})


const getMyProfile = asyncHandler(async (req,res) => {
    
     const employee = await Employee.findOne({
      user_id: req.user.id,
      isDeleted: false,
    })
      .populate("user_id", "userName email role_id")
      .populate("department_id", "departmentName")
      .populate("designation_id", "designationName")
      .populate("reportingManager", "firstName lastName employeeCode");

   
    if(!employee)
    {
        throw new ApiError(404, "Employee profile not found")
    }


    return res.statsu(200).json(
        new ApiResponse(200,"employee profile.",employee)
    )
})


const updateMyProfile = asyncHandler(async (req,res) => {

    const employee = await Employee.findOne({
      user_id: req.user.id,
      isDeleted: false,
    })

    if(!employee)
    {
        throw new ApiError(404, "Employee profile not found")
    }

      if (req.body.phone) {

      const phoneExists = await Employee.findOne({
        phone: req.body.phone,
        _id: { $ne: employee._id },
      });

      if (phoneExists) {
        
        throw new ApiError(409, "phone number already exist")

      }

      employee.phone = req.body.phone;
    }

     if (req.body.photo)
      employee.photo = req.body.photo;

    if (req.body.address)
      employee.address = req.body.address;

    if (req.body.emergencyContact)
      employee.emergencyContact = req.body.emergencyContact;

    if (req.body.bankDetails)
      employee.bankDetails = req.body.bankDetails;

    if (req.body.maritalStatus)
      employee.maritalStatus = req.body.maritalStatus;

    if (req.body.bloodGroup)
      employee.bloodGroup = req.body.bloodGroup;

    employee.updatedBy = req.user.id;

    await employee.save();


    return res.status(200).json(
        new ApiResponse(200,"profile updated successfully", employee)
    )

})



export {createEmployee,getEmployee,getEmployeeById,updateEmployeeData,deleteEmployee,getMyProfile,updateMyProfile}

