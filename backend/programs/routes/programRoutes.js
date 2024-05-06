import express from 'express'
import { addProgram, associateProgramToActuator, deleteProgram, disassociateProgramFromActuator, getProgram, getUserPrograms } from '../controllers/programsController.js'

const router = express.Router()
router.post('/', addProgram)
router.get('/user', getUserPrograms)
router.get('/id/:programId', getProgram)
router.put('/', associateProgramToActuator)
router.put('/disassociate', disassociateProgramFromActuator)
router.delete('/', deleteProgram)

export default router