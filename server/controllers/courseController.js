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
    updateOneCourse,
    findPublicAndAssetId
} from '../services/course.js'

import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'
import { findModeratorIdByUserId } from '../services/moderator.js'
import { findTopicByName } from '../services/topic.js'
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
                courses
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

export const getCoursesInTopCategories = async (req, res, next) => { }

export const getPopularCourses = async (req, res, next) => { }

/**
 * create new courses (instructor)
 */
export const instructorCreateCourse = async (req, res, next) => {
    try {
        const { image, materialFiles } = req.files

        const { courseName, duration, price, courseDescription, language, topicCourse, materials } =
            req.body

        const topics = await findTopicByName(JSON.parse(topicCourse))

        const imageUploadResult = await cloudinary.uploader.upload(image[0].path)
        fs.unlinkSync(image[0].path)

        const materialUpload = materialFiles.map((ele) => cloudinary.uploader.upload(ele.path, { resource_type: 'video' }))
        const uploadResult = await Promise.all(materialUpload)
        for (const file in materialFiles) {
            fs.unlinkSync(materialFiles[file].path)
        }
        const courseMaterials = JSON.parse(materials)
        for (const material in courseMaterials) {
            courseMaterials[material].url = uploadResult[material].secure_url
            courseMaterials[material].publicId = uploadResult[material].public_id
            courseMaterials[material].assetId = uploadResult[material].asset_id
        }

        const { instructorId } = req.payload

        await createNewCourse({
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
            instructorId,
            topicCourse: topics,
            imageUrl: imageUploadResult.secure_url,
            imageAssetId: imageUploadResult.asset_id,
            imagePublicId: imageUploadResult.public_id,
            courseMaterials
        })

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: "success"
            }
        })
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
    try {
        const courseImage = req.file

        const { courseId } = req.params
        const { courseName, duration, price, courseDescription, language, topicCourse } =
            req.body

        const course = await findPublicAndAssetId(courseId)

        if (!course) throw new Response('Internal Server Error', 'res_internalServer')

        const { imageAssetId, imagePublicId } = course

        let uploadResult
        if (courseImage) {
            uploadResult = await cloudinary.uploader.upload(courseImage.path, { asset_id: imageAssetId, public_id: imagePublicId })
            fs.unlinkSync(courseImage.path)
        }

        const result = await updateOneCourse({
            courseId,
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
            topicCourse: topicCourse ? JSON.parse(topicCourse) : null,
            imageAssetId: uploadResult ? uploadResult.imageAssetId : null,
            imagePublicId: uploadResult ? uploadResult.imagePublicId : null
        })

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        next(err)
    }
}
