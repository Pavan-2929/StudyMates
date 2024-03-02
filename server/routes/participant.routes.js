import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createParticipant } from "../controllers/participant.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createParticipant);

export default createParticipant;
