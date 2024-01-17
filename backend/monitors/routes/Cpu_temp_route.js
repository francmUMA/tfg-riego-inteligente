import express from 'express'
import { add_value } from '../controllers/Cpu_temp_controller.js'

const router = express.Router()
router.post('/', add_value)

export default router