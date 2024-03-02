import express from 'express'
import verifyToken from '../middlewares/verifyToken.js';
import { createActivity, getActivity, getAllActivity } from '../controllers/activity.controller.js';

const router = express.Router();

router.post("/create",verifyToken, createActivity)
router.get("/get", getAllActivity)
router.get('/get/:id', getActivity)

export default router