import express from 'express'
import verifyToken from '../middlewares/verifyToken.js';
import { createActivity, deleteActivity, getActivity, getAllActivity } from '../controllers/activity.controller.js';

const router = express.Router();

router.post("/create",verifyToken, createActivity)
router.get("/get", getAllActivity)
router.get('/get/:id', getActivity)
router.delete("/delete/:id", deleteActivity)

export default router