import mongoose from "mongoose"

const roleSchema = new mongoose({
    name:{
        type:String,
        enum:["Admin","HR","Manager","Employee"],
        default:"Employee"
    },

},
{
timestamps:true,
})


export default Role = mongoose.model('Role',roleSchema)