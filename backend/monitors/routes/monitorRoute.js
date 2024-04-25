import express from 'express'
import { getDeviceTemperatureValues, getSensorLast24hValues, getSensorValue, get_values_by_device } from '../controllers/monitorController.js'

const router = express.Router()
router.get('/all/:id', get_values_by_device)
router.get('/sensor/last/:id', getSensorValue)
router.get('/sensor/last24/:id', getSensorLast24hValues)
router.get('/temperature/all/:deviceId', getDeviceTemperatureValues)

export default router