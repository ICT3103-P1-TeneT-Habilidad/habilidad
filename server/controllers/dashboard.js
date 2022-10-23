import {
    createNewCourse,
    findCoursesSortedByPopularity,
    findCoursesWhereCreatedByInstructor,
    findCoursesWherePurchasedByStudent,
    findCoursesWhereSubscribable,
} from '../services/course.js'
import { responseCode } from '../utils/responseCode.js'
// import services
import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'

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
