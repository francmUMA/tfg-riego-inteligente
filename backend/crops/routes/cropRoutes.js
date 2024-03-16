import express from "express";
import { createCrop, deleteCrop, getCrops, updateCrop, getCrop, getCropAreas } from "../controllers/cropControllers.js";

const router = express.Router();
router.post('/', createCrop);
router.get('/', getCrops);
router.get('/:id', getCrop);
router.get('/areas/:id', getCropAreas);
router.put('/', updateCrop);
router.delete('/', deleteCrop);

export default router;