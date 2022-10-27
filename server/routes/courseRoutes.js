import express from 'express'
import { isAuthenticate } from '../controllers/auth.js'
import { getCourseDetail } from '../controllers/course.js'


const router = express.Router()

// Get course details
router.route('/').get(isAuthenticate, getCourseDetail)

export default router

