import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredMembers: {
      type: Number,
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
    },
    lastDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    organizationEmail: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
