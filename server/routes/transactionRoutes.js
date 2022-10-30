import express from 'express'
import { isAuthenticate } from '../controllers/auth.js'

const router = express.Router()

// Get transaction by Students
router.route('/transactionsByStudent').get(getTransactionByStudent)