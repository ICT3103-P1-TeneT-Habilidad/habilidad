import { createNewCourse, findCoursesSortedByPopularity, findCoursesWhereCreatedByInstructor, findCoursesWherePurchasedByStudent, findCoursesWhereSubscribable } from '../services/course.js'
import { Response } from '../utils/response.js'
import { responseCode } from '../utils/responseCode.js'
import jwt from 'jsonwebtoken'

export const indexCourses = async (req, res, next) => {

    try {
        const result = await findCoursesWhereSubscribable()

        res.status(200).json({ result })

    } catch (err) {
        next(err)
    }



}

export const createdCourses = async (req, res, next) => {

}

export const purchasedCourses = async (req, res, next) => {

}

export const topCategories = async (req, res, next) => {

}

export const popularCourses = async (req, res, next) => {

}

export const addNewCourse = async (req, res, next) => {

    try {

        const {
            courseName,
            duration,
            price,
            courseDescription,
            language,
            status,
            approvalStatus,
            accessToken,
            topicName,
            topicDescription
        } = req.body

        const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).userId


        const result = await createNewCourse({
            courseName,
            duration,
            price,
            courseDescription,
            language,
            status,
            approvalStatus,
            userId,
            topicName,
            topicDescription
        })
        res.status(200).json({ result })

    } catch (err) {
        next(err)
    }

}