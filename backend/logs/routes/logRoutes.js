import express from "express";
import { getDeviceLogs } from "../controllers/logController.js";


const router = express.Router();

router.get("/device/:deviceId", getDeviceLogs)

export default router;