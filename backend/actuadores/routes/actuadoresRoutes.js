import express from "express";
import { getActuadores, addActuador } from "../controllers/actuadoresController.js"

const router = express.Router();

router.get("/:device", getActuadores)
router.post("/:device", addActuador)

export default router;