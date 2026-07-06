import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Role from "../models/role.models.js"
import User from "../models/user.models.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose";

const create = asyncHandler(async (req,res) => {

    
    const {userName,email,password,role_id} = req.body;

        console.log({userName,email,password,role_id})

        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            throw new ApiError(409,"email already exist");
        }

        const role = await Role.findById(role_id);

        if(!role)
        {
            throw new ApiError(404,"Role not found");
        }

        const hasspassword = bcrypt.hashSync(password,10);

        const user = await User.create({
            userName,
            email,
            password:hasspassword,
            role_id
        });

        console.log(user._id)
        const createdUser = await User.findById(user._id)
        .select("-password")
        .populate("role_id", "name")
    
    res.status(200).json(
      new ApiResponse(200,"user is created ",createdUser)  
    )
})

const getAllUser = asyncHandler(async (req,res) => {
    
    const user = await User.find().populate("role_id");

    if(user.length <1)
    {
        throw new ApiError(404,"users are not exits");
    }

    res.status(200).json(
        new ApiResponse(200, "all users",user)
    )

})


const getUserById =asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(409, "user id is not valid")
    }

    const user = await User.findById(id).populate("role_id");

    if(!user)
    {
        throw new ApiError(404 , "user is not exist");
    }


    res.status(200).json(
        new ApiResponse(200, "user" , user)
    )
})


const updateUser = asyncHandler(async (req,res) => {
    
    const id = req.params.id;
    const {userName,email,password,role_id} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(409, "user id is not valid")
    }

    

})


export  {create,getAllUser,getUserById,updateUser}