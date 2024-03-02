import Participant from "../models/participants.model.js";

export const createParticipant = async (req, res, next) => {
  try {
    const newParticipant = await Participant.create(req.body);
    res.status(200).json(newParticipant);
  } catch (error) {
    next(error);
  }
};

export const getParticipantByActivity = async (req, res, next) => {
  try {
    const all = await Participant.find({activityId: req.params.id})
    res.status(200).json(all);
  } catch (error) {
    next(error);
  }
};

