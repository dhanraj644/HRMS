
const errorHandler = (err,req,res,next)=>{
    return res.status(err.statusCode||500).json({
        statusCode:err.statusCode||500,
        success:false,
        message:err.message || "Internal server error"
    })
} 


export default errorHandler