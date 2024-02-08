import express from "express";
import { getSensors, addSensor, deleteSensor, updateSensorArea, updateSensorDevicePin, updateSensorDevice, updateSensorPosition } from "../controllers/sensorsController.js"

const router = express.Router();

router.get("/:device", getSensors)
router.post("/:device", addSensor)
router.delete("/:device", deleteSensor)
router.put("/area", updateSensorArea)
router.put("/pin", updateSensorDevicePin)
router.put("/device", updateSensorDevice)
router.put("/position", updateSensorPosition)

export default router;