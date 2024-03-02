import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    doubtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
    }
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment