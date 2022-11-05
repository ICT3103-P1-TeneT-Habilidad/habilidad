import { Response } from '../responses/response.js'
import { responseCode } from '../responses/responseCode.js'
import cloudinary from '../utils/cloudinary.js'
import { Prisma } from '@prisma/client'
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
    findPopularCourse,
    findCourseByTopic,
    updateCourseToNotPopular,
    updateCourseToPopular,
    findCourseByPopularTopic
} from '../services/course.js'

import { findInstructorIdByUserId } from '../services/instructor.js'
import { findStudentIdByUserId } from '../services/student.js'
import { findTopicByName } from '../services/topic.js'
import { getErrorResponse } from '../utils/error.js'
import { addOneCoursePurchased } from '../services/transaction.js'
import { replaceSanitizedQuot } from '../validations/input.js'

// logs
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'


/**
 * Get course description for one course
 */
export const getOneCourse = async (req, res, next) => {
    try {

        const { courseId } = req.sanitizedParams

        const course = await findOneCourse(courseId)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: course,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

/**
 * get all courses (TODO)
 */
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await findAllCourses()

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
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

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
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

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const getCoursesByCategory = async (req, res, next) => {
    try {
        const { topicName } = req.sanitizedBody
        if (!topicName) throw new Response('Bad Request', 'res_badRequest')
        const courses = await findCourseByTopic(topicName)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const getCoursesByTopCategories = async (req, res, next) => {
    try {
        const { topicName } = req.sanitizedBody
        if (!topicName) throw new Response('Bad Request', 'res_badRequest')
        const courses = await findCourseByPopularTopic(topicName)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const getPopularCourses = async (req, res, next) => {
    try {
        const courses = await findPopularCourse()

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: courses,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

/**
 * create new courses (instructor)
 */
export const instructorCreateCourse = async (req, res, next) => {
    try {
        const { image, materialFiles } = req.files

        const { courseName, duration, price, courseDescription, language, topicCourse, materials } =
            req.sanitizedBody

        const topics = await findTopicByName(JSON.parse(replaceSanitizedQuot(topicCourse)))

        const imageUploadResult = await cloudinary.uploader.upload(image[0].path)
        fs.unlinkSync(image[0].path)

        const materialUpload = materialFiles.map((ele) => cloudinary.uploader.upload(ele.path, { resource_type: 'video' }))
        const uploadResult = await Promise.all(materialUpload)
        for (const file in materialFiles) {
            fs.unlinkSync(materialFiles[file].path)
        }

        const courseMaterials = JSON.parse(replaceSanitizedQuot(materials))
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

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: "success"
            }
        })
    } catch (err) {
        let error
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            error = new Response('Internal Server Error', 'res_internalServer')
        } else {
            error = new Response('Internal Server Error', 'res_internalServer')
        }

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const approveCourse = async (req, res, next) => {
    try {
        const { courseId } = req.sanitizedParams
        const { moderatorId } = req.payload
        const { approvalStatus } = req.sanitizedBody

        await updateCourseApprovalStatus({ courseId, moderatorId, approvalStatus })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.sanitizedParams
        const { moderatorId } = req.payload

        const result = await deleteOneCourse({ courseId, moderatorId })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}


const getPublibAndAssetId = (course, courseMaterialId) => {

    const { courseMaterial } = course

    for (const index in courseMaterial) {
        if (courseMaterialId === courseMaterial[index].courseMaterialId) {
            const assetId = courseMaterial[index].assetId
            const publicId = courseMaterial[index].publicId
            return { assetId, publicId }
        }
    }

}

export const editCourse = async (req, res, next) => {
    try {

        const { courseId } = req.sanitizedParams
        const course = await findOneCourse(courseId)

        if (!course) throw new Response('Bad Request', 'res_badRequest')

        const { image, materialFiles } = req.files

        const { courseName, duration, price, courseDescription, language, topicCourse, materials } =
            req.sanitizedBody

        const topics = topicCourse ? await findTopicByName(JSON.parse(replaceSanitizedQuot(topicCourse))) : []

        let imageUploadResult
        if (image) {
            if (image.length > 1) throw new Response('Bad Request', 'res_badRequest')
            else if (image.length == 1) {
                imageUploadResult = await cloudinary.uploader.upload(image[0].path, { resource_type: 'video', asset_id: course.imageAssetId, public_id: course.imagePublicId })
                fs.unlinkSync(image[0].path)
            }

        }
        const courseMaterials = JSON.parse(replaceSanitizedQuot(materials))

        let uploadResult
        if (materialFiles && materialFiles.length > 0) {

            let materialUpload = []
            for (const file in materialFiles) {
                const { assetId, publicId } = getPublibAndAssetId(course, courseMaterials[file].courseMaterialId)
                materialUpload.push(
                    cloudinary.uploader.upload(materialFiles[file].path, { resource_type: 'video', asset_id: assetId, public_id: publicId })
                )
            }
            uploadResult = await Promise.all(materialUpload)
            for (const file in materialFiles) {
                fs.unlinkSync(materialFiles[file].path)
            }
        }


        await updateOneCourse({
            courseId,
            courseName,
            duration: parseInt(duration),
            price: parseFloat(price),
            courseDescription,
            language,
            topicCourse: topics,
            imageAssetId: uploadResult?.asset_id,
            imagePublicId: uploadResult?.public_id,
            courseMaterials: courseMaterials.length > 0 ? courseMaterials : null
        })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const setCoursePopular = async (req, res, next) => {
    try {
        const { courseId } = req.sanitizedBody

        const result = await updateCourseToPopular(courseId)

        if (!result) throw new Response('Bad Request', 'res_badRequest')

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const setCourseNotPopular = async (req, res, next) => {
    try {

        const { courseId } = req.sanitizedBody
        if (!courseId) throw new Response('Bad Request', 'res_badRequest')

        const result = await updateCourseToNotPopular(courseId)

        if (!result) throw new Response('Bad Request', 'res_badRequest')

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const purchaseOneCourse = async (req, res, next) => {
    try {

        const { courseId, amountPaid } = req.sanitizedBody

        if (!courseId || !amountPaid) throw new Response('Bad Request', 'res_badRequest')

        const { studentId } = req.payload

        await addOneCoursePurchased({ studentId, courseId, amountPaid })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            }
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)

    }

}