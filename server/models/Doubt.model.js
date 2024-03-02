import mongoose from 'mongoose'

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/unilink-2929.appspot.com/o/21944-istockgetty-images-plusmaurusone.jpg?alt=media&token=779795a5-6b06-4218-acae-914df389915b",
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Doubt = mongoose.model("Doubt", doubtSchema)

export default Doubt