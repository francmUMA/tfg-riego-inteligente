import express from 'express'
import { createToken, verifyToken } from '../controllers/tokenController.js'

const router = express.Router()
router.post('/', createToken)
router.get('/check', verifyToken)

export default router