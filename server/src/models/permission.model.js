import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
{

    module:{
        type:String,
        required:true,
        trim:true
    },

    action:{
        type:String,
        required:true,
        trim:true
    },

    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String
    }

},
{
    timestamps:true
});

const Permission = mongoose.model("Permission",permissionSchema);

export default Permission;