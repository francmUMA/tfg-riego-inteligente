import express from "express";
import { getActuadores, addActuador, deleteActuador, updateActuadorArea, updateMode, updateActuadorDevicePin, updateActuadorDevice, updateActuadorPosition } from "../controllers/actuadoresController.js"

const router = express.Router();

router.get("/:device", getActuadores)
router.post("/:device", addActuador)
router.delete("/:device", deleteActuador)
router.put("/area", updateActuadorArea)
router.put("/mode", updateMode)
router.put("/pin", updateActuadorDevicePin)
router.put("/device", updateActuadorDevice)
router.put("/position", updateActuadorPosition)

export default router;