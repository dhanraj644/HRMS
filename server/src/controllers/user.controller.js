import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Role from "../models/role.models.js"
import User from "../models/user.models.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { response } from "express";

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

        const createdUser = await User.findById(user._id)
        .select("-password -refreshToken")
        .populate("role_id", "name")
    
    return res.status(200).json(
      new ApiResponse(200,"user is created ",createdUser)  
    )
})

const getAllUser = asyncHandler(async (req,res) => {
    
    const user = await User.find()
    .select("-password -refreshToken")
    .populate("role_id");

    if(user.length <1)
    {
        throw new ApiError(404,"users are not exits");
    }

   return res.status(200).json(
        new ApiResponse(200, "all users",user)
    )

})


const getUserById =asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(400, "id is not valid")
    }

    const user = await User.findById(id)
    .select("-password -refreshToken")
    .populate("role_id");

    if(!user)
    {
        throw new ApiError(404 , "user is not exist");
    }


  return  res.status(200).json(
        new ApiResponse(200, "user" , user)
    )
})


const updateUser = asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(400, "id is not valid")
    }

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

   if (req.body.email) {

        const emailExists = await User.findOne({
            email: req.body.email,
            _id: { $ne: id }
        });

        if (emailExists) {
            throw new ApiError(409, "Email already exists");
        }

    }

    if ( req.body.role_id) {

        const role = await Role.findById(req.body.role_id);

        if (!role) {
            throw new ApiError(404, "Role not found");
        }

    }

    if ( req.body.password) {

        req.body.password = await bcrypt.hash(req.body.password, 10);

    }

    const updateUser = await User.findByIdAndUpdate(id, req.body,{new:true,runValidators: true})
    .select("-password -refreshToken").populate("role_id","name")


   return res.status(200).json(
        new ApiResponse(200,"user update successfully",updateUser)
    )

})


const updateUserStatus = asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    if(! mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(400,"id is not valid")
    }

    const user = await User.findById(id)

    if(!user)
    {
        throw new ApiError(404,"user not found");
    }

    const updateuser= await User.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    }).select("-password -refreshToken").populate("role_id","name")


  return  res.status(200).json(
        new ApiResponse(200,"user status updated",updateUser)
    )

})

const updatePassword = asyncHandler(async (req,res) => {
    
    const {password}= req.body;
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(400, " id is not valid")
    }

    const user = await User.findById(id);

    if(!user)
    {
        throw new ApiError(404, "user is not found ")
    }

    const hasspassword = bcrypt.hashSync(password,10);


    const updateUser = await User.findByIdAndUpdate(id,{
        password:hasspassword
    },
    {
        new:true,
        runValidators:true,
    })
    .select("-password -refreshToken").populate("role_id", "nmae")


    return res.status(200).json(
        new ApiResponse(200,"password is updated successfully",updateUser)
    )
})

const deleteUserById = asyncHandler(async (req,res) => {
    
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ApiError(400 ,"id is not valid")
    }

    const deleteUser = await findByIdAndDelete(id);

    if(!deleteUser)
    {
        throw new ApiError(404, "user not found")
    }

     return res.status(200).json(

        new ApiResponse(200, "user is deleted successfully  ", null)

    )


})

export  {create,getAllUser,getUserById,updateUser,updateUserStatus,updatePassword,deleteUserById}