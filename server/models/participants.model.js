import mongoose from "mongoose";

const participantsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  participantsName: {
    type: String,
  },
  participantsEmail: {
    type: String,
    unique: true,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
});

const Participant = mongoose.model("Participant", participantsSchema)

export default Participant