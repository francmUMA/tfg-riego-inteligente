import express from 'express'
import { addProgram, getUserPrograms } from '../controllers/programsController.js'

const router = express.Router()
router.post('/', addProgram)
router.get('/user', getUserPrograms)

export default router