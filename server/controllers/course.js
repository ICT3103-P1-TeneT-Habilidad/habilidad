import { responseCode } from '../responses/responseCode.js'
// import services
import {
    createNewCourse,
    findCoursesSortedByPopularity,
    findCoursesWhereCreatedByInstructor,
    findCoursesWherePurchasedByStudent,
    findCoursesWhereSubscribable,
    findCourseDetail
} from '../services/course.js'
import { findInstructorIdByUserId, findStudentIdByUserId } from '../services/user.js'

// logs
// import logger from '../utils/log.js'
// import { LogMessage } from '../utils/logMessage.js'



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

export const indexCourses = async (req, res, next) => {
    try {
        const courses = await findCoursesWhereSubscribable()
        const { accessToken, refreshToken } = req.body

        res.status(responseCode.res_ok).json({
            result: {
                courses,
                accessToken,
                refreshToken,
            },
        })
    } catch (err) {
        next(err)
    }
}

export const createdCourses = async (req, res, next) => {
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

export const purchasedCourses = async (req, res, next) => {
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

export const topCategories = async (req, res, next) => {}

export const popularCourses = async (req, res, next) => {}

export const addNewCourse = async (req, res, next) => {
    try {
        const { courseName, duration, price, courseDescription, language, status, approvalStatus, topic } = req.body

        const { instructorId } = await findInstructorIdByUserId(req.payload.userId)

        const result = await createNewCourse({
            courseName,
            duration,
            price,
            courseDescription,
            language,
            status,
            approvalStatus,
            instructorId,
            topic,
        })
        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}
