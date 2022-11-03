import express from 'express'
import multer from 'multer'
// import controllers
import { isAuthenticate } from '../controllers/authController.js'
import {
    getOneCourse,
    getAllCourses,
    getCoursesCreatedByInstructor,
    getCoursesPurchasedByStudent,
    getCoursesInTopCategories,
    getPopularCourses,
    instructorCreateCourse,
    approveCourse,
    deleteCourse,
    editCourse,
    setCoursePopular,
    setCourseNotPopular,
    purchaseOneCourse,
} from '../controllers/courseController.js'
// import middleware
import { courseUpload, imageUpload } from '../middleware/multer.js'
import { isRoleInstructor, isRoleModerator, isRoleStudent } from '../middleware/checkRole.js'
import { sanitizeBody } from '../validations/input.js'

const router = express.Router()

// Get all courses (unauth)
router.route('/').get(getAllCourses)

// Get all purchases courses by student
router.route('/created').get(isAuthenticate, isRoleStudent, getCoursesPurchasedByStudent)

// Get all courses instructor (owner) created
router.route('/purchased').get(isAuthenticate, isRoleInstructor, getCoursesCreatedByInstructor)

// Get all courses that are top categories
router.route('/topCategories').get(getCoursesInTopCategories)

// Get all courses popular among new signups
router.route('/popularCourses').get(getPopularCourses)

// Create new course (instructor)
router.route('/create').post(isAuthenticate, isRoleInstructor, courseUpload, instructorCreateCourse)

// Set Course to Popular
router.route('/courseSetPopular').post(isAuthenticate, isRoleModerator, sanitizeBody, setCoursePopular) //sanitize

// Set Course to Not Popular
router.route('/courseSetNotPopular').post(isAuthenticate, isRoleModerator, sanitizeBody, setCourseNotPopular) //sanitize

// Student purchase course
router.route('/purchase').post(isAuthenticate, isRoleStudent, purchaseOneCourse)

// Approve/reject course
router.route('/:courseId').patch(isAuthenticate, isRoleModerator, sanitizeBody, approveCourse) //sanitize

// Get course details
router.route('/:courseId').get(isAuthenticate, getOneCourse)

// Delete course
router.route('/:courseId').delete(isAuthenticate, isRoleInstructor, deleteCourse)

// Edit course
router.route('/:courseId').put(isAuthenticate, isRoleInstructor, courseUpload, editCourse) //sanitize
export default router
