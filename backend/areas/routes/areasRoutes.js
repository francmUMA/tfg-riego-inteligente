import express from "express";
import { get_areas, add_area, delete_area } from "../controllers/areasController.js"

const router = express.Router();
router.get("/", get_areas)
router.post("/", add_area)
router.delete("/:id", delete_area)

export default router;