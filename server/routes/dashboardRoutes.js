import express from 'express'
import { isAuthenticate } from '../controllers/auth.js'

import { indexCourses, createdCourses, purchasedCourses, topCategories, popularCourses, addNewCourse } from '../controllers/dashboard.js'

const router = express.Router()

// Get all courses
router.route('/').get(indexCourses)

// Get all purchases courses
router.route('/created').get(createdCourses)

// Get all courses instructor (owner) created
router.route('/purchased').get(purchasedCourses)

// get all courses that are top categories
router.route('/topCategories').get(topCategories)

// get all courses popular among new signups
router.route('/popularCourses').get(popularCourses)

router.route('/create').post(isAuthenticate, addNewCourse)


export default router

