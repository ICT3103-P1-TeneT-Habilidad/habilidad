import { responseCode } from '../responses/responseCode.js'
// import services
import {
    createNewCourse,
    findCoursesSortedByPopularity,
    findCoursesWhereCreatedByInstructor,
    findCoursesWherePurchasedByStudent,
    findCoursesWhereSubscribable,
    findCourseDetail,
    findAllCourses,
    updateCourseApprovalStatus
} from '../services/course.js'
import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'
import cloudinary from '../utils/cloudinary.js'

import fs from 'fs'
// logs
// import logger from '../utils/log.js'
// import { LogMessage } from '../utils/logMessage.js'

/**
 * Get course description for one course
 */
export const getCourseDetail = async (req, res, next) => {
    try {
        const { courseId } = req.sanitizedBody

        const course = await findCourseDetail(courseId)

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

        const { instructorId } = await findInstructorIdByUserId(req.payload.userId)
        const uploadResult = await cloudinary.uploader.upload(courseImage.path)
        fs.unlinkSync(courseImage.path)

        const result = await createNewCourse({
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
            status,
            approvalStatus,
            instructorId,
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
        const { courseId } = req.body
        const result = await updateCourseApprovalStatus()

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}
