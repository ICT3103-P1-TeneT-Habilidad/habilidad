import express from 'express'
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
} from '../controllers/courseController.js'
// import middleware
import { imageUpload } from '../middleware/multer.js'
import { isRoleInstructor, isRoleModerator, isRoleStudent } from '../middleware/checkRole.js'
import { sanitizeBody } from '../validations/input.js'

const router = express.Router()

// Get all courses (unauth)
router.route('/').get(getAllCourses)

// Get course details
router.route('/:courseId').get(isAuthenticate, getOneCourse)

// Get all purchases courses by student
router.route('/created').get(isAuthenticate, isRoleStudent, getCoursesPurchasedByStudent)

// Get all courses instructor (owner) created
router.route('/purchased').get(isAuthenticate, isRoleInstructor, getCoursesCreatedByInstructor)

// Get all courses that are top categories
router.route('/topCategories').get(getCoursesInTopCategories)

// Get all courses popular among new signups
router.route('/popularCourses').get(getPopularCourses)

// Create new course (instructor)
router.route('/create').post(isAuthenticate, isRoleInstructor, imageUpload, instructorCreateCourse)

// Approve/reject course
router.route('/:courseId').patch(isAuthenticate, isRoleModerator, sanitizeBody, approveCourse) //sanitize

// Delete course
router.route('/:courseId').delete(isAuthenticate, isRoleInstructor, deleteCourse)

// Edit course
router.route('/:courseId').put(isAuthenticate, isRoleInstructor, editCourse) //sanitize

export default router
