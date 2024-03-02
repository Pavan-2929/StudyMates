import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const userId = req.id;

    const { content, doubtId } = req.body;

    const newCommnet = await Comment.create({ userId, content, doubtId });

    res.status(200).json(newCommnet);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const doubtId = req.params.id;

    const comment = await Comment.find({doubtId});

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComments = async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)

        res.status(200).json(deletedComment);
    } catch (error) {
        next(error)
    }
}
