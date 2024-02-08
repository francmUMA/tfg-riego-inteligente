import express from 'express'
import { add_user, get_user_by_email, get_user_by_nif, check_password, update_user, get_user_by_token, updateUserPosition } from '../controllers/userController.js'

const router = express.Router()
router.post('/', add_user)
router.get('/nif/:NIF', get_user_by_nif)
router.get('/email/:email', get_user_by_email)
router.post('/password-check', check_password)
router.put('/', update_user)
router.get('/token', get_user_by_token)
router.put('/position', updateUserPosition)

export default router