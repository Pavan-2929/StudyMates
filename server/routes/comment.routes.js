import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createComment,
  deleteComments,
  getComments,
} from "../controllers/comment.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/get/:id", getComments);
router.delete('/delete/:id', deleteComments);

export default router;
