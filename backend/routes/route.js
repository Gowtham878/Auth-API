import express from'express'
import { userLogin,userRegister,getUser} from '../controllers/rcontroller.js'
import { validatelogin,validateregister } from '../middleware/validate.js'
import authenticate from '../middleware/authenticator.js'
const router = express.Router()

router.post('/login',validatelogin,userLogin)
router.post('/register',validateregister,userRegister)
router.get('/profile', authenticate ,getUser)

export default router