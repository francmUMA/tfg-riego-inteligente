import express from "express";
import { getDevices,addDevice,deleteDevice } from "../controllers/deviceController.js";

const router = express.Router();

router.get("/", getDevices)
router.post("/", addDevice)
router.delete("/:id", deleteDevice)

export default router;