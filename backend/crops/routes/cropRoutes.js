import express from "express";
import { createCrop, deleteCrop, getCrops, updateCrop } from "../controllers/cropControllers";

const router = express.Router();
router.post('/', createCrop);
router.get('/', getCrops);
router.put('/', updateCrop);
router.delete('/', deleteCrop);

export default router;