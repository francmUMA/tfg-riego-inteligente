import express from 'express'
import { add_user, get_user_by_email, get_user_by_nif, check_password } from '../controllers/UserController.js'

const router = express.Router()
router.post('/', add_user)
router.get('/nif/:NIF', get_user_by_nif)
router.get('/email/:email', get_user_by_email)
router.post('/password-check', check_password)

export default router