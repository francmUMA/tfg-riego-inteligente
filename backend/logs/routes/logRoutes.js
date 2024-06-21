import express from "express";
import { getActuadorLogs, getDeviceLogs, getSensorLogs } from "../controllers/logController.js";


const router = express.Router();

router.get("/device/:deviceId", getDeviceLogs)
router.get("/sensor/:sensorId", getSensorLogs)
router.get("/actuador/:actuadorId", getActuadorLogs)

export default router;