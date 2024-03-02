import express from 'express'
import { createMaterial, deleteMaterial, getMaterial, getMaterials, updateMaterial } from '../controllers/material.controllers.js'

const router = express.Router()

router.get('/get', getMaterials)
router.post('/create', createMaterial)
router.delete('/delete/:id', deleteMaterial)
router.put('/update/:id', updateMaterial)
router.get('/get/:id', getMaterial)

export default router