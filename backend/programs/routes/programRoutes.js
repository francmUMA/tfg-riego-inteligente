import express from 'express'
import { addProgram, associateProgramToActuator, getUserPrograms } from '../controllers/programsController.js'

const router = express.Router()
router.post('/', addProgram)
router.get('/user', getUserPrograms)
router.put('/', associateProgramToActuator)

export default router