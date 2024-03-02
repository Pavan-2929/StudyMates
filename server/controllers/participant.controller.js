import Participant from "../models/participants.model.js";

export const createParticipant = async (req, res, next) => {
    try {

        const newParticipant = await Participant.create(req.body)

        res.status(200).json(newParticipant)
    } catch (error) {
        next(error)
    }
}