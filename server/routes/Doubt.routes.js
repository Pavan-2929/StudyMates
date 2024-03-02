import express from 'express'
import { createDoubt, deleteDoubt, getDoubtById, getDoubts } from '../controllers/Doubt.controllers.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.get("/get", getDoubts)
router.get("/get/:id", getDoubtById)
router.post("/create", verifyToken, createDoubt)
router.delete("/delete/:id", verifyToken, deleteDoubt)

export default router