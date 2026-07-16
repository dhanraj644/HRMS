import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },

    departmentCode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    isDeleted: {
    type: Boolean,
    default: false,
    },
  },
  {
    timestamps: true,
  }
);

departmentSchema.index({
  status: 1,
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;