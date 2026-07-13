import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    holidayName: {
      type: String,
      required: true,
      trim: true,
    },

    holidayDate: {
      type: Date,
      required: true,
    },

    holidayType: {
      type: String,
      enum: [
        "National",
        "Festival",
        "Company",
        "Optional",
      ],
      default: "National",
    },

    description: {
      type: String,
      trim: true,
    },

    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;