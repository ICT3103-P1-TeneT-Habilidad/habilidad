import express from 'express'
// import controllers
import { isAuthenticate } from '../controllers/auth.js'
import {
    getCourseDetail,
    getAllCourses,
    getCoursesCreatedByInstructor,
    getCoursesPurchasedByStudent,
    getCoursesInTopCategories,
    getPopularCourses,
    createCourse,
} from '../controllers/course.js'
import { imageUpload } from '../utils/multer.js'

const router = express.Router()

// Get all courses (unauth)
router.route('/').get(getAllCourses)

// Get course details
router.route('/').get(isAuthenticate, getCourseDetail)

// Get all purchases courses by student
router.route('/created').get(getCoursesPurchasedByStudent)

// Get all courses instructor (owner) created
router.route('/purchased').get(getCoursesCreatedByInstructor)

// get all courses that are top categories
router.route('/topCategories').get(getCoursesInTopCategories)

// get all courses popular among new signups
router.route('/popularCourses').get(getPopularCourses)

// create new course (instructor)
router.route('/create').post(isAuthenticate, imageUpload, createCourse)

export default router
