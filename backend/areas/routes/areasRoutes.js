import express from "express";
import { get_areas, add_area, delete_area, updateColor, updateAreaName, get_area, updateIndoorArea } from "../controllers/areasController.js"

const router = express.Router()
router.get("/", get_areas)
router.get("/:id", get_area)
router.post("/", add_area)
router.delete("/:id", delete_area)
router.put("/color/:id", updateColor)
router.put("/name/:id", updateAreaName)
router.put("/indoor/:id", updateIndoorArea)

export default router;