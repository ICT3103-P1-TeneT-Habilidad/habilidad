import express from 'express'
import { isAuthenticate } from '../controllers/authController.js'
import { purchaseOneCourse } from '../controllers/transactionController.js'

const router = express.Router()

// Get transaction by Students
router.route('/transactionsByStudent').get(purchaseOneCourse)

export default router
