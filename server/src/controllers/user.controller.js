import asyncHandler from "../utils/asyncHandler.j";
import ApiResponse from "../utils/ApiResponse.js"
import User from "../models/user.models.js"

const create = asyncHandler(async (req,res) => {
    
    const {} = req.body;

        await User.create();

    
    res.status(200).josn(
      new ApiResponse(200,"user is created ",)  
    )
})


export {create}