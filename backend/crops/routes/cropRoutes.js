import express from "express";
import { createCrop, deleteCrop, getCrops, updateCrop, getCrop, getCropAreas, getCropDevices, getCropActuadores, getCropSensors } from "../controllers/cropControllers.js";

const router = express.Router();
router.post('/', createCrop);
router.get('/', getCrops);
router.get('/:id', getCrop);
router.get('/areas/:id', getCropAreas);
router.get('/devices/:id', getCropDevices);
router.get('/actuadores/:id', getCropActuadores);
router.get('/sensors/:id', getCropSensors);
router.put('/', updateCrop);
router.delete('/', deleteCrop);


export default router;