import express from 'express'
import { addProgram } from '../controllers/programsController.js'

const router = express.Router()
router.post('/', addProgram)

export default router