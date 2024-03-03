import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createParticipant,
  getParticipantByActivity,
  getParticipantByUserId,
} from "../controllers/participant.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createParticipant);
router.get("/get/:id", getParticipantByActivity);
router.get("/get/user/:userid", getParticipantByUserId);

export default router;
