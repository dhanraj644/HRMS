import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema(
  {
    leaveName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    totalDays: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const LeaveType = mongoose.model("LeaveType", leaveTypeSchema);

export default LeaveType;