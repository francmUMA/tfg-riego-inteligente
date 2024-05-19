import express from "express";
import { getSensors, addSensor, deleteSensor, updateSensorArea, updateSensorDevice, updateSensorPosition, updateSensorName, updateSensorAvailability, getUserSensors, getUnassignedSensors, getSensor } from "../controllers/sensorsController.js"

const router = express.Router();

// router.get("/all", getUserSensors)
router.get("/unassignedCauSensors", getUnassignedSensors)
router.get('/sensor/:sensorId', getSensor)
router.get("/:device", getSensors)
router.post("/:device", addSensor)
router.delete("/:device", deleteSensor)
router.put("/area", updateSensorArea)
router.put("/device", updateSensorDevice)
router.put("/position", updateSensorPosition)
router.put("/name", updateSensorName)
router.put("/availability", updateSensorAvailability)

export default router;