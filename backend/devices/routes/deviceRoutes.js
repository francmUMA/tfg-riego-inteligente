import express from "express";
import { getDevices,addDevice,deleteDevice,updatePosition, updateIp, testConnection, getDevice, updateArea, updateDeviceName, getDeviceUuid, getDeviceByUuid } from "../controllers/deviceController.js";

const router = express.Router();

// router.get("/", getDevices)
router.get("/id/:id", getDevice)
router.get("/uuid", getDeviceUuid)
router.get("/uuid/:uuid", getDeviceByUuid)
router.post("/", addDevice)
router.delete("/:id", deleteDevice)
router.put("/position", updatePosition)
router.put("/ip", updateIp)
router.put("/test/:id", testConnection)
router.put("/area", updateArea)
router.put("/name", updateDeviceName)

export default router;