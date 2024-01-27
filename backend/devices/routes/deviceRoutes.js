import express from "express";
import { getDevices,addDevice } from "../controllers/deviceController.js";

const router = express.Router();

router.get("/", getDevices)
router.post("/", addDevice)

export default router;