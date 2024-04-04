import express from 'express'
import { get_values_by_device } from '../controllers/monitorController.js'

const router = express.Router()
router.get('/all/:id', get_values_by_device)

export default router