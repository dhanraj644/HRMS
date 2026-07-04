import mongoose, { Types } from "mongoose";


const employeeSchema= new mongoose.Schema({

    employeeCode:{
        Type:String,
        require:true,
        trim:true,
    },
    firstName:{
        Type:String,
        require:true,
        trim:true
    },
    lastName:{
        Type:String,
        require:true,
        trim:true
    },
    email:{
        Type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    phone:{
        Type:String,
        require:true,
        unique:true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
    },
    gender:{
        Types:String,
        require:true,
        enum:{
            values:["Male","Female","other"],
            message:"{VALUE} is not a valid gender" 
        }
    },
    dob:{
        Type:Date,
        require:true,

    },
    bloodGroup:{
        Type:String,
        require:true,
        enum:{
            values: [
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
             ],
             message:"{VALUE} is not a valid blood group",
        }
    },
    maritalStatus: {
         type: String,
         required: true,
        enum: {
        values: [
        "Single",
        "Married",
        "Divorced",
        "Widowed"
            ],
    message: "{VALUE} is not a valid marital status"
         }
},

photo:{
    Type:String,
    require:true,
    default:null,
},

joiningDate:{

    Types:Date,
    require:true,
    default:Date.now
},
employeeType:{
    Type:String,
    require:true,
    trim:true,
    lowercase:true,

    enum:[
     "full-time",
    "part-time",
    "contract",
    "intern",
    "temporary",
    "freelance"
    ]
},
status:{
    Type:String,
    require:true,
    lowercase:true,
    enum:[
    "active",
    "inactive",
    "on-leave",
    "terminated",
    "resigned"
    ],
  default:"active",
},

address: {
  current: {
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please enter a valid pincode"]
    }
  },

  permanent: {
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please enter a valid pincode"]
    }
  }
},
emergencyContact:{
    name:{
        Type:String,
        require:true,
        trim:true,
    },
    relationship:{

        Type:String,
        required: true,
         trim: true
    },
    phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]
  }

},
bankDetails: {
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  ifsc: {
    type: String,
    required: true,
    uppercase: true,
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"]
  },
  branch: {
    type: String,
    required: true,
    trim: true
  }
},
documents: [
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: [
        "aadhaar",
        "pan",
        "resume",
        "passport",
        "driving-license",
        "marksheet",
        "offer-letter",
        "other"
      ]
    },
    url: {
      type: String,
      required: true
    }
  }, 
]
,
createdBy: {

    Type: mongoose.Types.ObjectId,
    ref:"User",
    require:true
  },

  updatedBy: {
    Type:mongoose.Types.ObjectId,
    ref:"User",
    default: null,
  }

},{
    timestamps:true,
})



export default  Employee = mongoose.model("Employee",employeeSchema);