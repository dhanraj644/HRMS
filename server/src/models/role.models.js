import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        enum:["Admin","HR","Manager","Employee"],
        default:"Employee",
         required: true,
         unique: true
    },

},
{
timestamps:true,
})


 const Role = mongoose.model('Role',roleSchema)

 export default Role;