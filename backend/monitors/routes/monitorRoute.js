import express from 'express'
import { getAreaMeanHumidity, getAreaMeanSoilHumidity, getAreaMeanSoilTemp, getAreaMeanTemperature, getDeviceTemperatureLast24hValues, getDeviceTemperatureValues, getSensorLast24hValuesFlow, getSensorLast24hValuesHum, getSensorLast24hValuesSoilHum, getSensorLast24hValuesSoilTemp, getSensorLast24hValuesTemp, getSensorValue, get_values_by_device } from '../controllers/monitorController.js'

const router = express.Router()
router.get('/all/:id', get_values_by_device)
router.get('/sensor/last/:id', getSensorValue)
router.get('/sensor/last24/temperature/:id', getSensorLast24hValuesTemp)
router.get('/sensor/last24/soilTemperature/:id', getSensorLast24hValuesSoilTemp)
router.get('/sensor/last24/humidity/:id', getSensorLast24hValuesHum)
router.get('/sensor/last24/soilHumidity/:id', getSensorLast24hValuesSoilHum)
router.get('/sensor/last24/flow/:id', getSensorLast24hValuesFlow)
router.get('/temperature/all/:deviceId', getDeviceTemperatureValues)
router.get('/temperature/last24/:deviceId', getDeviceTemperatureLast24hValues)
router.get('/temperature/area/mean/:areaId', getAreaMeanTemperature)
router.get('/humidity/area/mean/:areaId', getAreaMeanHumidity)
router.get('/soilTemp/area/mean/:areaId', getAreaMeanSoilTemp)
router.get('/soilHum/area/mean/:areaId', getAreaMeanSoilHumidity)

export default router