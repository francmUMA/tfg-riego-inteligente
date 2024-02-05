import express from "express";
import { getActuadores, addActuador, deleteActuador } from "../controllers/actuadoresController.js"

const router = express.Router();

router.get("/:device", getActuadores)
router.post("/:device", addActuador)
router.delete("/:device", deleteActuador)

export default router;