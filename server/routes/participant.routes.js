import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createParticipant,
  getParticipantByActivity,
} from "../controllers/participant.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createParticipant);
router.get("/get/:id", getParticipantByActivity);

export default router;
