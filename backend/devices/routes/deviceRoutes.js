import express from "express";
import { getDevices,addDevice,deleteDevice,updatePosition, updateIp, testConnection } from "../controllers/deviceController.js";

const router = express.Router();

router.get("/", getDevices)
router.post("/", addDevice)
router.delete("/:id", deleteDevice)
router.put("/position", updatePosition)
router.put("/ip", updateIp)
router.put("/test/:id", testConnection)

export default router;