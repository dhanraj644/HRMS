import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    designation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      default: "Single",
    },

    photo: {
      type: String,
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    employeeType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Intern",
        "Contract",
        "Freelancer",
      ],
      default: "Full-Time",
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
        "On Leave",
        "Resigned",
        "Terminated",
      ],
      default: "Active",
    },

    salary: {
      type: Number,
      default: 0,
    },

  
    address: {
      current: {
        address: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },

      permanent: {
        address: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },
    },

    emergencyContact: {
      name: String,
      relationship: String,
      phone: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"],
      },
    },


    bankDetails: {
      bankName: String,
      accountNumber: String,
      ifsc: String,
      branch: String,
    },


    documents: [
      {
        name: String,

        type: {
          type: String,
          enum: [
            "aadhaar",
            "pan",
            "resume",
            "passport",
            "driving-license",
            "marksheet",
            "offer-letter",
            "other",
          ],
        },

        url: String,
      },
    ],


    isDeleted: {
      type: Boolean,
      default: false,
    },

  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);