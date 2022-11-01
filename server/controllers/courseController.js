import { responseCode } from '../responses/responseCode.js'
import cloudinary from '../utils/cloudinary.js'
import fs from 'fs'
// import services
import {
    createNewCourse,
    findCoursesWhereCreatedByInstructor,
    findCoursesWherePurchasedByStudent,
    findOneCourse,
    findAllCourses,
    updateCourseApprovalStatus,
    deleteOneCourse,
    updateOneCourse
} from '../services/course.js'
import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'
import { findModeratorIdByUserId } from '../services/moderator.js'
// logs
// import logger from '../utils/log.js'
// import { LogMessage } from '../utils/logMessage.js'

/**
 * Get course description for one course
 */
export const getOneCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params

        const course = await findOneCourse(courseId)

        // Log for sending response
        // let logMsg = new LogMessage(200, req).msg
        // logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                course,
            },
        })
    } catch (err) {
        // Log for error message
        // let logMsg = new LogMessage(err.statusCode, req).msg
        // logger.error(logMsg)

        next(err)
    }
}

/**
 * get all courses (TODO)
 */
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await findAllCourses()

        res.status(responseCode.res_ok).json({
            result: {
                courses,
            },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * get all courses created by the instructor
 */
export const getCoursesCreatedByInstructor = async (req, res, next) => {
    try {
        const { userId } = req.payload
        const { instructorId } = await findInstructorIdByUserId(userId)
        const courses = await findCoursesWhereCreatedByInstructor(instructorId)

        res.status(responseCode.res_ok).json({
            result: {
                courses,
            },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * get all courses puchased by student
 */
export const getCoursesPurchasedByStudent = async (req, res, next) => {
    try {
        const { userId } = req.payload
        const { studentId } = await findStudentIdByUserId(userId)
        const courses = await findCoursesWherePurchasedByStudent(studentId)

        res.status(responseCode.res_ok).json({
            result: {
                courses,
            },
        })
    } catch (err) {
        next(err)
    }
}

export const getCoursesInTopCategories = async (req, res, next) => {}

export const getPopularCourses = async (req, res, next) => {}

/**
 * create new courses (instructor)
 */
export const instructorCreateCourse = async (req, res, next) => {
    try {
        const courseImage = req.file

        const { courseName, duration, price, courseDescription, language, status, approvalStatus, topicCourse } =
            req.body

        const uploadResult = await cloudinary.uploader.upload(courseImage.path)
        fs.unlinkSync(courseImage.path)

        const { instructorId } = req.payload

        const result = await createNewCourse({
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
            status,
            approvalStatus,
            instructorId: instructorId,
            topicCourse: JSON.parse(topicCourse),
            imageUrl: uploadResult.secure_url,
        })

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}

export const approveCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const { moderatorId } = req.payload
        const { approvalStatus } = req.sanitizedBody

        const result = await updateCourseApprovalStatus({ courseId, moderatorId, approvalStatus })

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}

export const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const { moderatorId } = req.payload

        const result = await deleteOneCourse({ courseId, moderatorId })

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}

export const editCourse = async (req, res, next) => {
    console.log(req)
    try {
        const { courseId } = req.params
        console.log(courseId)
        const { courseName, duration, price, courseDescription, language } = req.body

        const result = await updateOneCourse({
            courseId,
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
        })

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}
