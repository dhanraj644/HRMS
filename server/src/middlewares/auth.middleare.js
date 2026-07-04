import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from "jsonwebtoken"
import  User from "../models/user.models.js"
const auth = asyncHandler( (req,res,next)=>{
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        throw new ApiError(401,"Unauthorized")
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify();

    const user = await User.findById(decoded.id);

    if(!user)
    {
        throw new ApiError(404,"user not found")
    }

    if(!user.isActive)
    {
        throw new ApiError(403 , "User is inactive");
    }   


    req.user = user;

    next();
})

export default auth;