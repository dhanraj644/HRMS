import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken";
import User from '../models/user.models.js'
import {generateAccessToken,generateRefreshToken} from "../utils/genrateTokens.js"
import bcrypt from "bcrypt"

const Login = asyncHandler(async (req,res) => {

    const {email,password}= req.body;

    const user = await User.findOne({email}).populate("role_id", "name");

    if(!user)
    {
        throw new ApiError(404, "user not found")
    }

    if(user.is_active == "Inactive")
    {
        throw new ApiError(403, "your account is inactive")
    }

    const isPasswordCorrect = bcrypt.compareSync(password , user.password)

    if(!isPasswordCorrect)
    {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken= generateAccessToken(user);
    const refressToken= generateRefreshToken(user);

    user.refreshToken = refressToken;
    user.last_login= new Date();
    await user.save()


    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;


    const cookiesOption ={
        httpOnly:true,
        secure:true
    }


     return res.status(200)
     .cookie("accessToken",accessToken,{
        cookiesOption
     })
     .cookie("refreshToken",refressToken,{
        cookiesOption
     })
     .json(
        new ApiResponse(
            200,
            "user login successfully",
                  {
            userData,
            accessToken,
            refressToken
            }
        )
    );
    
});


const LogOut = asyncHandler(async (req,res) => {

    console.log(req.user)
    await User.findByIdAndUpdate(
        req.user._id,

        {
            refreshToken:null
        }
    )
    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(
        new ApiResponse(200, 'Logout successfully',null)
    )
})


const getMe = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)
    .select("-password -refreshToken")
    .populate("role_id", "name")

    if(!user)
    {
        throw new ApiError(404, "user Not found")
    }



   return res.status(200).json(
        new ApiResponse(200, "logged user", user)
    )

})

const refreshAccessToken = async (req,res) => {
    
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required");
     }
    let decoded;

    try {
       decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        
        throw new ApiError(401, "Invalid or expired refresh token.")
    }

    const user = await User.findById(decoded._id);

    if(!user)
    {
        throw new ApiError(404, "User not found");
    }

    if(user.refreshToken !== refreshToken)
    {
        throw new ApiError(401, "refresh token is invalid");
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken=newRefreshToken;

    await user.save();

    const cookiesOption ={
        httpOnly:true,
        secure:true
    }


    return res.status(200)
    .cookie("accessToken",newAccessToken,cookiesOption)
     .cookie("refreshToken",newRefreshToken,cookiesOption )
    .json(
        new ApiResponse(200,"accessToken refresh successfully", {newAccessToken,newRefreshToken})
    )
}


const changePassword = asyncHandler(async (req,res) => {
    
    const {oldPassword,NewPassword} = req.body;

    const user= await User.findById(req.user._id);

    if(!user)
    {
        throw new ApiError(404, "user not found")
    }

    
    if(!bcrypt.compareSync(oldPassword,user.password))
    {
        throw new ApiError(401, "password not matched")
    }


    const hasspassword = bcrypt.hashSync(NewPassword, 10);


    user.password=hasspassword;
    user.save();


   return res.statsu(200).json(

        new ApiResponse(200 ,"password is changed",[])
    )

})




export  {Login,LogOut,refreshAccessToken,getMe}