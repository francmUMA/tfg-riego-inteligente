import express from 'express'
import { getDeviceTemperatureValues, getSensorLast24hValuesHum, getSensorLast24hValuesSoilTemp, getSensorLast24hValuesTemp, getSensorValue, get_values_by_device } from '../controllers/monitorController.js'

const router = express.Router()
router.get('/all/:id', get_values_by_device)
router.get('/sensor/last/:id', getSensorValue)
router.get('/sensor/last24/temperature/:id', getSensorLast24hValuesTemp)
router.get('/sensor/last24/soilTemperature/:id', getSensorLast24hValuesSoilTemp)
router.get('/sensor/last24/temperature/:id', getSensorLast24hValuesHum)
router.get('/sensor/last24/humidity/:id', getSensorLast24hValuesTemp)
router.get('/temperature/all/:deviceId', getDeviceTemperatureValues)

export default router