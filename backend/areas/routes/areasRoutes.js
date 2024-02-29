import express from "express";
import { get_areas, add_area, delete_area, updatePolygonType, updateColor, updateAreaName } from "../controllers/areasController.js"

const router = express.Router();
router.get("/", get_areas)
router.post("/", add_area)
router.delete("/:id", delete_area)
router.put("/:id", updatePolygonType)
router.put("/color/:id", updateColor)
router.put("/name/:id", updateAreaName)

export default router;