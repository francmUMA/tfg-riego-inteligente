import express from "express";
import { getSensors, addSensor, deleteSensor, updateSensorArea, updateSensorDevicePin, updateSensorDevice, updateSensorPosition, updateSensorName, updateSensorAvailability, updateSensorValue, getUserSensors } from "../controllers/sensorsController.js"

const router = express.Router();

router.get("/:device", getSensors)
router.post("/:device", addSensor)
router.delete("/:device", deleteSensor)
router.put("/area", updateSensorArea)
router.put("/pin", updateSensorDevicePin)
router.put("/device", updateSensorDevice)
router.put("/position", updateSensorPosition)
router.put("/name", updateSensorName)
router.put("/availability", updateSensorAvailability)
router.put("/value", updateSensorValue)
router.get("/all", getUserSensors)

export default router;