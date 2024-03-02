import mongoose from "mongoose";

const participantsSchema = new mongoose.Schema({
  participantsName: {
    type: String,
  },
  participantsEmail: {
    type: String,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
});

const Participant = mongoose.model("Participant", participantsSchema)

export default Participant