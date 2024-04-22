import express from "express";
import { 
    getActuadores, 
    addActuador, 
    deleteActuador, 
    updateActuadorArea, 
    updateMode, 
    updateActuadorDevicePin, 
    updateActuadorDevice, 
    updateActuadorPosition, 
    updateActuadorStatus, 
    updateActuadorName, 
    getUserActuadores
} from "../controllers/actuadoresController.js"

const router = express.Router();

router.get("/all", getUserActuadores)
router.get("/:device", getActuadores)
router.post("/:device", addActuador)
router.delete("/:device", deleteActuador)
router.put("/area", updateActuadorArea)
router.put("/mode", updateMode)
router.put("/pin", updateActuadorDevicePin)
router.put("/device", updateActuadorDevice)
router.put("/position", updateActuadorPosition)
router.put("/status", updateActuadorStatus)
router.put("/name", updateActuadorName)

export default router;