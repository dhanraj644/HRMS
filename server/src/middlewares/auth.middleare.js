import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from "jsonwebtoken"
import  User from "../models/user.models.js"

const auth = asyncHandler( async (req,res,next)=>{
    
    let token;

    if(req.cookies?.accessToken)
    {
        token = req.cookies.accessToken
    }
    else if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer "))
    {
        token = req.headers.authorization.split(" ")[1];
    }


    if(!token)
    {
        throw new ApiError(401, "Unauthorized")
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired access token.");
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken").populate("role_id", "name");

    if(!user)
    {
        throw new ApiError(404,"user not found")
    }

    if(!user.is_active)
    {
        throw new ApiError(403 , "User is inactive");
    }   


    req.user = user;

    next();
})

export default auth;