import express from 'express'
import { getCoordsByArea, addCoords, deleteCoordsByArea, updateCoord } from '../controllers/coordsController.js'

const router = express.Router()

router.get("/:area", getCoordsByArea)
router.post("/:area", addCoords)
router.delete("/:area", deleteCoordsByArea)
router.put("/:coord", updateCoord)

export default router