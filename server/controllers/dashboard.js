import { findCoursesSortedByPopularity, findCoursesWhereCreatedByInstructor, findCoursesWherePurchasedByStudent, findCoursesWhereSubscribable } from '../services/course.js'
import { Response } from '../utils/response.js'
import { responseCode } from '../utils/responseCode.js'

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