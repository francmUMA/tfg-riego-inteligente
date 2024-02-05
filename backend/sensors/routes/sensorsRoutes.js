import express from "express";
import { getSensors, addSensor, deleteSensor } from "../controllers/sensorsController.js"

const router = express.Router();

router.get("/:device", getSensors)
router.post("/:device", addSensor)
router.delete("/:device", deleteSensor)

export default router;