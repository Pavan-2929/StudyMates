import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { createBookmark, getAllUser, getUserById, updateUser, userData } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/user', verifyToken, userData)
router.post('/user/update', verifyToken, updateUser)
router.get('/user/get/:id', getUserById)
router.post("/bookmark",verifyToken,  createBookmark)
router.get("/user/all", getAllUser)

export default router