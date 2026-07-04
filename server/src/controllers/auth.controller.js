import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../../../../example/src/utils/ApiResponse.js"
import jwt from "jsonwebtoken";

const Login = asyncHandler(async (req,res) => {


    const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
    );
     res.status(200).json(
        new ApiResponse(
            200,
            {token},
            "user login successfully"
        )
    )
    
})