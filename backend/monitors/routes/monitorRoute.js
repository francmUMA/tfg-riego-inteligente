import express from 'express'
import { getSensorValue, get_values_by_device } from '../controllers/monitorController.js'

const router = express.Router()
router.get('/all/:id', get_values_by_device)
router.get('/sensor/last/:id', getSensorValue)

export default router