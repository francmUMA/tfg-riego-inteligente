import express from 'express'
import { add_value,get_values_by_device } from '../controllers/Cpu_temp_controller.js'

const router = express.Router()
router.post('/', add_value)
router.get('/all/:id', get_values_by_device)

export default router