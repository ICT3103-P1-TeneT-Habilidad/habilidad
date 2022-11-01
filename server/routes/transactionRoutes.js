import express from 'express'
import { isAuthenticate } from '../controllers/authController.js'
import { purchaseOneCourse } from '../controllers/transactionController.js'
import { isRoleStudent } from '../middleware/checkRole.js'

const router = express.Router()

// Get transaction by Students
router.route('/transactionsByStudent').get(isAuthenticate, isRoleStudent, purchaseOneCourse)

export default router
