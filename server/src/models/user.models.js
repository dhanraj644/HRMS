import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    role_id:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        
    },
    is_active:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
    last_login:{
        type:Date,
    }
},
{
    timestamps:true
})

const User = mongoose.model("User",userSchema);