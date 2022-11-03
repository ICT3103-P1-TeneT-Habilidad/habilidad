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
import { courseUpload } from '../middleware/multer.js'
import { isRoleInstructor, isRoleModerator, isRoleStudent } from '../middleware/checkRole.js'
import { sanitizeBody, sanitizeUrlParam } from '../validations/input.js'

const router = express.Router()

// Get all courses (unauth)
router.route('/').get(getAllCourses)

// Get all purchases courses by student
// Auth: Token, Role based
router.route('/created').get(isAuthenticate, isRoleStudent, getCoursesPurchasedByStudent)

// Get all courses instructor (owner) created
// Auth: Token, Role based
router.route('/purchased').get(isAuthenticate, isRoleInstructor, getCoursesCreatedByInstructor)

// Get all courses that are top categories
// Auth: Token, Role based
// Sanitized: Req.Body
router.route('/topCategories').get(sanitizeBody, getCoursesInTopCategories)

// Get all courses popular among new signups
router.route('/popularCourses').get(getPopularCourses)

// Create new course (instructor)
// Auth: Token, Role based
// Sanitized: Req.Body
router.route('/create').post(isAuthenticate, isRoleInstructor, courseUpload, sanitizeBody, instructorCreateCourse)

// Set Course to Popular
// Auth: Token, Role based
// Sanitized: Req.Body
router.route('/courseSetPopular').post(isAuthenticate, isRoleModerator, sanitizeBody, setCoursePopular)

// Set Course to Not Popular
// Auth: Token, Role based
// Sanitized: Req.Body
router.route('/courseSetNotPopular').post(isAuthenticate, isRoleModerator, sanitizeBody, setCourseNotPopular)

// Student purchase course
// Auth: Token, Role based
// Sanitized: Req.Body
router.route('/purchase').post(isAuthenticate, isRoleStudent, sanitizeBody, purchaseOneCourse)

// Approve/reject course
// Auth: Token, Role based
// Sanitized: Req.Body
// Sanitized: Req.Params
router.route('/:courseId').patch(isAuthenticate, isRoleModerator, sanitizeBody, sanitizeUrlParam, approveCourse)

// Get course details
// Auth: Token, Role based
// Sanitized: Req.Params
router.route('/:courseId').get(isAuthenticate, sanitizeUrlParam, getOneCourse)

// Delete course
// Auth: Token, Role based
// Sanitized: Req.Params
router.route('/:courseId').delete(isAuthenticate, isRoleInstructor, sanitizeUrlParam, deleteCourse)

// Edit course
// Auth: Token, Role based
// Sanitized: Req.Body, Req.Params
router.route('/:courseId').put(isAuthenticate, isRoleInstructor, courseUpload, sanitizeBody, sanitizeUrlParam, editCourse)
export default router
