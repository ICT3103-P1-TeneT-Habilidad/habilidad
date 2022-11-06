// services
import { createNewTopic, findAllTopics, findPopularTopic } from '../services/topic.js'
// responses
import { Response } from '../responses/response.js'
import { responseCode } from '../responses/responseCode.js'
import { getErrorResponse } from '../utils/error.js'

import fs from 'fs'

import cloudinary from '../utils/cloudinary.js'

// import logs
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'

export const getAllTopics = async (req, res, next) => {
    try {
        const topics = await findAllTopics()

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: topics,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const createTopic = async (req, res, next) => {
    try {
        const { topicName, description } = req.body
        const topicImage = req.file

        const uploadResult = await cloudinary.uploader.upload(topicImage.path)
        fs.unlinkSync(topicImage.path)

        const topic = await createNewTopic({ topicName, description, url: uploadResult.secure_url })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success',
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const getPopularTopics = async (req, res, next) => {
    try {

        const topics = await findPopularTopic()

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: topics,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}
